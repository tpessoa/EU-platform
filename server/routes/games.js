const router = require("express").Router();
let ConfigGames = require("../models/config_games.model");
let ColorGame = require("../models/color_game.model");
let Puzzle = require("../models/puzzle.model");
let Quiz = require("../models/quiz.model");
let WordSearch = require("../models/word_search.model");

let Games = require("../models/games.model");

router.route("/").get((req, res) => {
  res.send("JOGOS");
});

/**
 * get all games
 */

router.get("/all", async (req, res) => {
  try {
    let games = await Games.find({});
    res.send(games);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Get game by ID
 */
router.get("/:id", async (req, res) => {
  try {
    let games = await Games.find({ game_ref_id: req.params.id });
    res.send(games);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Delete game by ID
 */

router.delete("/:id", async (req, res) => {
  try {
    let deletedGame = await Games.deleteOne({ _id: req.params.id });
    console.log(deletedGame);
    res.send(deletedGame);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/game/:id", async (req, res) => {
  try {
    let game = await Games.findOne({ _id: req.params.id });
    res.send(game);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/add/:gameName/:gameId", async (req, res) => {
  const {
    title,
    description,
    age,
    difficulty,
    config,
    assets,
  } = req.body.gameObj;

  const { gameName, gameId } = req.params;

  console.log(assets);

  try {
    const newGame = new Games({
      game_ref_id: gameId,
      game_ref_name: gameName,
      title: title,
      description: description,
      age: { ...age },
      difficulty: difficulty,
      config: { ...config },
      assets: { ...assets },
    });
    console.log(newGame);
    await newGame.save();

    res.send(newGame);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/:game/:id", async (req, res) => {
  const {
    title,
    description,
    age,
    difficulty,
    config,
    assets,
  } = req.body.gameObj;

  try {
    let game = await Games.findOne({ _id: req.params.id });
    game.title = title;
    game.description = description;
    game.age = age;
    game.difficulty = difficulty;
    game.config = config;
    game.assets = assets;

    await game.save();

    res.send(game);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/allGames2", async (req, res) => {
  let games = [
    {
      name: "Jogo de Colorir",
      ref: "colorGame",
      refAll: "allColorGames",
    },
    {
      name: "Puzzle",
      ref: "puzzle",
      refAll: "allPuzzles",
    },
    {
      name: "Quiz",
      ref: "quiz",
      refAll: "allQuizzes",
    },
    {
      name: "Sopa de Letras",
      ref: "wordSearch",
      refAll: "allWordSearchs",
    },
  ];

  res.send(games);
});

/**
 * COLOR GAME
 */
router.get("/allColorGames", async (req, res) => {
  try {
    let color_games = await ColorGame.find({});
    const newObj = {
      name: "color-game",
      title: "Jogos de Colorir",
      games: color_games,
    };
    res.send(newObj);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/colorGame/:id", async (req, res) => {
  try {
    let all_colors = await ConfigGames.findOne({ name: "color_game" });
    let result = await ColorGame.findOne({ ref: req.params.id });
    const newObj = {
      config: all_colors,
      game: result,
    };
    res.send(newObj);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * PUZZLE
 */
router.get("/allPuzzles", async (req, res) => {
  try {
    let puzzles = await Puzzle.find({});
    const newObj = {
      name: "puzzle",
      title: "Jogos de Puzzle",
      games: puzzles,
    };
    res.send(newObj);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/puzzle/:id", async (req, res) => {
  try {
    let puzzle = await Puzzle.findOne({ ref: req.params.id });
    res.send(puzzle);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * QUIZ
 */
router.get("/allQuizzes", async (req, res) => {
  try {
    let quizzes = await Quiz.find({});
    const newObj = {
      name: "quiz",
      title: "Quizes",
      games: quizzes,
    };
    res.send(newObj);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/quiz/:id", async (req, res) => {
  try {
    let quiz = await Quiz.findOne({ ref: req.params.id });
    res.send(quiz);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * SOPA DE LETRAS
 */

router.get("/allWordSearchs", async (req, res) => {
  try {
    let wordSearchs = await WordSearch.find({});
    const newObj = {
      name: "wordSearch",
      title: "Jogos de Sopa de letras",
      games: wordSearchs,
    };
    res.send(newObj);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get("/wordSearch/:id", async (req, res) => {
  try {
    let wordSearch = await WordSearch.findOne({ ref: req.params.id });
    res.send(wordSearch);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
