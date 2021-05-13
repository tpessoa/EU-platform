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

// /**
//  * get all games
//  */

// router.get("/all", async (req, res) => {
//   try {
//     let games = await Games.find({});
//     res.send(games);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });

// /**
//  * Get game by ID
//  */
// router.get("/:id", async (req, res) => {
//   const gameId = parseInt(req.params.id);
//   try {
//     let games = await Games.find({ game_ref_id: gameId });
//     res.send(games);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });

// /**
//  * Delete game by ID
//  */
// router.delete("/:id", async (req, res) => {
//   try {
//     let deletedGame = await Games.deleteOne({ _id: req.params.id });
//     console.log(deletedGame);
//     res.send(deletedGame);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });

// router.get("/game/:id", async (req, res) => {
//   try {
//     let game = await Games.findOne({ _id: req.params.id });
//     res.send(game);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });

// router.post("/add/:gameName/:gameRefId", async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       thumbnail,
//       age,
//       difficulty,
//       config,
//       assets,
//     } = req.body;

//     const { gameName, gameRefId } = req.params;
//     const newGame = new Games({
//       game_ref_id: gameRefId,
//       game_ref_name: gameName,
//       title: title,
//       description: description,
//       thumbnail: { ...thumbnail },
//       age: { ...age },
//       difficulty: difficulty,
//       config: { ...config },
//       assets: { ...assets },
//     });
//     await newGame.save();

//     res.send(newGame);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });

// router.post("/:game/:id", async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       thumbnail,
//       age,
//       difficulty,
//       config,
//       assets,
//     } = req.body;

//     let game = await Games.findOne({ _id: req.params.id });
//     game.title = title;
//     game.description = description;
//     game.thumbnail = thumbnail;
//     game.age = age;
//     game.difficulty = difficulty;
//     game.config = { ...config };
//     game.assets = { ...assets };

//     await game.save();

//     res.send(game);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });

module.exports = router;
