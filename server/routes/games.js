const router = require("express").Router();

const Games = require("../models/games.model");
const Statistics = require("../models/statistics.model");

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

router.post("/statistics", async (req, res) => {
  try {
    // console.log(req.body);
    const game = await Games.findById(req.body.gameId);
    // console.log(game.config.questions);

    // if exists statistics of the game
    const gameStatistics = await Statistics.findOne({
      game_id: req.body.gameId,
    });
    // console.log(gameStatistics);

    let newStats;
    if (gameStatistics) {
      // if time to resp question exists

      for (let i = 0; i < gameStatistics.total_answers.length; i++) {
        gameStatistics.total_answers[i].right.push(
          req.body.userAnswers[i].userIndex ===
            req.body.userAnswers[i].rightIndex
        );
        gameStatistics.total_answers[i].time_resp.push(
          game.config.time_to_resp_question - req.body.userTimes[i]
        );
      }

      newStats = new Statistics(gameStatistics);
      newStats.isNew = false;
    } else {
      let userAnswersArr = [];
      for (let i = 0; i < game.config.questions.length; i++) {
        const newQuestionObj = {
          question: game.config.questions[i].question,
          right: [
            req.body.userAnswers[i].userIndex ===
              req.body.userAnswers[i].rightIndex,
          ],
          time_resp: [
            game.config.time_to_resp_question - req.body.userTimes[i],
          ],
        };
        userAnswersArr.push(newQuestionObj);
      }

      const gameStatsObj = {
        game_id: req.body.gameId,
        game_ref_name: game.game_ref_name,
        total_answers: userAnswersArr,
      };
      newStats = new Statistics({
        ...gameStatsObj,
      });
    }

    await newStats.save();
    res.send(newStats);
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
