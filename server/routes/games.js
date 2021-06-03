const router = require("express").Router();

const Games = require("../models/games.model");
const Statistics = require("../models/statistics.model");

router.get("/all-games", async (req, res) => {
  try {
    const games = await Games.find();
    res.send(games);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

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

    // if new game create empty stats
    if (!req.body._id) {
      const newStats = new Statistics({
        game_id: newGame._id,
        game_ref_name: req.body.game_ref_name,
        all_answers: [],
        user_time_arr: [],
        num_opened: 0,
        num_finished: 0,
        num_wins: 0,
      });
      await newStats.save();
    }
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

router.post("/statistics-quiz", async (req, res) => {
  try {
    const game = await Games.findById(req.body.gameId);
    const gameStats = await Statistics.findOne({
      game_id: req.body.gameId,
    });

    console.log(req.body);

    const user_answers = [];
    if (game.config.timer) {
      // put the right user time
      for (const ans of req.body.answers) {
        user_answers.push({
          correct: ans.correct,
          user_time: game.config.time_to_resp_question - ans.time_remaining,
        });
      }
      gameStats.all_answers.push(user_answers);
    } else {
      gameStats.all_answers.push(req.body.answers);
    }

    gameStats.num_finished++;
    await gameStats.save();

    res.send(gameStats);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/statistics-game-opened", async (req, res) => {
  try {
    const gameStats = await Statistics.findOne({
      game_id: req.body.gameId,
    });
    gameStats.num_opened++;
    await gameStats.save();
    res.send(gameStats);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/statistics-game-finished", async (req, res) => {
  try {
    const gameStats = await Statistics.findOne({
      game_id: req.body.gameId,
    });
    gameStats.num_finished++;
    if (req.body.win) gameStats.num_wins++;
    if (req.body.timer) gameStats.user_time_arr.push(req.body.timer);

    await gameStats.save();
    res.send(gameStats);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/statistics-reset", async (req, res) => {
  try {
    console.log("reseting");
    const gameStats = await Statistics.findOne({
      game_id: req.body.gameId,
    });
    // reset obj
    gameStats.all_answers = [];
    gameStats.user_time_arr = [];
    gameStats.num_opened = 0;
    gameStats.num_finished = 0;
    gameStats.num_wins = 0;

    await gameStats.save();
    res.send(gameStats);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/statistics", async (req, res) => {
  try {
    console.log(req.body);
    const game = await Games.findById(req.body.gameId);
    res.send(game);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/all-statistics", async (req, res) => {
  try {
    const allGamesStats = await Statistics.find();
    res.send(allGamesStats);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/statistics/game/:id", async (req, res) => {
  try {
    const gameStats = await Statistics.findOne({
      game_id: req.params.id,
    });

    res.send(gameStats);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
