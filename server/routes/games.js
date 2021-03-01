const router = require('express').Router();
let ConfigGames = require('../models/config_games.model');
let ColorGame = require('../models/color_game.model');
let Puzzle = require('../models/puzzle.model');
let Quiz = require('../models/quiz.model');
let WordSearch = require('../models/word_search.model');

router.route('/').get((req, res) => {
    res.send('JOGOS');
});

/**
 * COLOR GAME
 */
router.get('/allColorGames', async (req, res) => {
    try {
        let color_games = await ColorGame.find({});
        res.send(color_games);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});

router.get('/colorGame/:ref', async (req, res) => {
    try {
        let all_colors = await ConfigGames.findOne({ name: 'color_game' });
        let result = await ColorGame.findOne({ image_ref: req.params.ref });
        const newObj = {
            config: all_colors,
            game: result
        }
        res.send(newObj);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});


/**
 * PUZZLE
 */
router.get('/allPuzzles', async (req, res) => {
    try {
        let puzzles = await Puzzle.find({});
        res.send(puzzles);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});

router.get('/puzzle/:ref', async (req, res) => {
    try {
        let puzzle = await Puzzle.findOne({ image_ref: req.params.ref });
        res.send(puzzle);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});

/**
 * QUIZ
 */
router.get('/allQuizzes', async (req, res) => {
    try {
        let quizzes = await Quiz.find({});
        res.send(quizzes);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});

router.get('/quiz/:ref', async (req, res) => {
    try {
        let quiz = await Quiz.findOne({ ref: req.params.ref });
        res.send(quiz);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});

 /**
 * SOPA DE LETRAS
 */


module.exports = router;