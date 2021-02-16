const router = require('express').Router();
let ConfigGames = require('../models/config_games.model');
let ColorGame = require('../models/color_game.model');
let Puzzle = require('../models/puzzle.model');

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


module.exports = router;