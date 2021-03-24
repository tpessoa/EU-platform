const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
let ConfigGames = require("../models/config_games.model");
const { v4: uuidv4 } = require("uuid");

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
    const tempObj = {
      id: uuidv4(),
      img_path: newImgPath,
    };
    // if null there is no configuration for this game yet -> create one
    if (configGameObj == null) {
      const newConfigGame = new ConfigGames({
        // for puzzle game
        game_type: req.body.game,
        img_paths: [tempObj],

        // for color game
        // colors object
      });
      await newConfigGame.save();
    } else {
      configGameObj.img_paths.unshift(tempObj);
      await configGameObj.save();
    }

    // removeFile(newImgPath);
    res.send({ img: tempObj });
  } catch (e) {
    removeFile(newImgPath);
    res.status(500).send({ message: e.message });
  }
});

router.delete("/upload/:game/:img_path", async (req, res) => {
  const { game, img_path } = req.params;

  try {
    const gameConfig = await ConfigGames.findOne({
      game_type: game,
    });

    // delete this obj and update the DB
    console.log(gameConfig.img_paths);
    const obj = gameConfig.img_paths.find((obj) => obj.id === img_path);
    const objIndex = gameConfig.img_paths.indexOf(obj);
    gameConfig.img_paths.splice(objIndex, 1);
    await gameConfig.save();

    res.send({ gameConfig: gameConfig });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/getAllImages/:game", async (req, res) => {
  try {
    const gameConfig = await ConfigGames.findOne({
      game_type: req.params.game,
    });
    res.send({ gameConfig: gameConfig });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/getAllGamesImages", async (req, res) => {
  try {
    const allGamesConfigs = await ConfigGames.find({});
    const newArr = [];
    allGamesConfigs.forEach((elem) => {
      const game_type = elem.game_type;
      const img_paths = elem.img_paths;
      newArr.unshift({ game_type, img_paths });
    });
    res.send({ allGames: newArr });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
