const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
let ConfigGames = require("../models/config_games.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "content/images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // store the file
    cb(null, true);
  } else {
    // reject the file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // accepts 10 MB
  },
  fileFilter: fileFilter,
});

const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

router.post("/uploadImg", upload.single("image"), async (req, res, next) => {
  if (req.file == null) {
    return res.send("Imagem inválida");
  }

  // store the path to the img
  const strPartialURL = "/api/";
  const newImgPath = strPartialURL + req.file.path;

  if (req.body.game == null) {
    removeFile(newImgPath);
    return res.send("jogo não especificado");
  }

  try {
    let configGameObj = await ConfigGames.findOne({ game_type: req.body.game });
    // if null there is no configuration for this game yet -> create one
    if (configGameObj == null) {
      const newConfigGame = new ConfigGames({
        // for puzzle game
        game_type: req.body.game,
        img_paths: [newImgPath],

        // for color game
        // colors object
      });
      await newConfigGame.save();
    } else {
      configGameObj.img_paths.push(newImgPath);
      await configGameObj.save();
    }

    // removeFile(newImgPath);
    res.send({ imgPath: newImgPath });
  } catch (e) {
    removeFile(newImgPath);
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
