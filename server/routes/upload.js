const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const Games = require("../models/games.model");
const Images = require("../models/images.model");

const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // store the file
    cb(null, true);
  } else {
    // reject the file
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "content/images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // accepts 10 MB
  },
  fileFilter: fileFilter,
});

/* ONLY for uploading images from games */
const storageGames = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "content/images/games/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const uploadGames = multer({
  storage: storageGames,
  limits: {
    fileSize: 1024 * 1024 * 10, // accepts 10 MB
  },
  fileFilter: fileFilter,
});

/**
 * Upload a image to server and keep a reference to that in the database
 */
router.post(
  "/gameImage/:linkedObjId/:inputRef",
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (req.file == null) {
        return res.send("Imagem inválida");
      }
      const tempObj = {
        id: uuidv4(),
        path: "/api/", // this is needed for loading the image
        server_path: req.file.path,
      };

      console.log(req.params);

      // save to collection of images with the respective game reference
      const newImage = new Images({
        image: tempObj,
        linked_obj_id: req.params.linkedObjId,
        input_ref: req.params.inputRef,
      });
      await newImage.save();

      res.send({ img: tempObj });
    } catch (e) {
      removeFile(req.file.path);
      res.status(500).send({ message: e.message });
    }
  }
);

/**
 * get images by the respective linked object
 */
router.get("/images/:linkedObjId", async (req, res) => {
  try {
    const imagesArr = await Images.find({
      linked_obj_id: req.params.linkedObjId,
    });
    res.send(imagesArr);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * update image by the respective linked object
 */
router.post("/images", async (req, res) => {
  try {
    for (const imageId of req.body.imagesIDs) {
      console.log(imageId);
      const imageObj = await Images.findOne({
        _id: imageId,
      });
      imageObj.linked_obj_id = req.body.permanentId;
      await imageObj.save();
    }
    res.send("images updated");
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Delete image by ID
 */
router.delete("/images/:id", async (req, res) => {
  try {
    // delete in the server
    const { _id, image } = req.body;

    // variables sanitizer #TODO
    const path = image.server_path;
    fs.unlinkSync(path);

    // delete in the DB
    let deletedImage = await Images.deleteOne({ _id: _id });
    console.log(deletedImage);
    res.send(deletedImage);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
