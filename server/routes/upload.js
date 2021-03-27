const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

let Games = require("../models/games.model");

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

router.post(
  "/gameImage",
  uploadGames.single("image"),
  async (req, res, next) => {
    if (req.file == null) {
      return res.send("Imagem inválida");
    }

    const tempObj = {
      id: uuidv4(),
      path: "/api/", // this is needed for loading the image
      server_path: req.file.path,
    };

    try {
      let game = await Games.findOne({ _id: req.params.id });
      res.send({ img: tempObj });
    } catch (e) {
      removeFile(req.file.path);
      res.status(500).send({ message: e.message });
    }
  }
);

module.exports = router;
