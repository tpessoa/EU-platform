const router = require("express").Router();

const Games = require("../models/games.model");

router.get("/type/:ref", async (req, res) => {
  try {
    const games = await Games.find({ game_ref_name: req.params.ref });
    res.send(games);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/game/:id", async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);
    res.send(game);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/save-game", async (req, res) => {
  try {
    // console.log(req.body);
    const newGame = new Games({
      ...req.body,
    });
    if (req.body._id) {
      newGame.isNew = false;
    }
    await newGame.save();
    res.send(newGame);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.delete("/delete-game/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Games.findOneAndDelete({ _id: id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
    // delete works
    // delete image in server
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
