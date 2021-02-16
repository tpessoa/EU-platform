const router = require('express').Router();
let ColorGame = require('../models/color_game.model');
let ConfigGames = require('../models/config_games.model');

router.route('/').get((req, res) => {
    res.send('JOGOS');
});

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

router.get('/colorGame/', async (req, res) => {
    try {
        let all_colors = await ConfigGames.findOne({ name: 'color_game' });
        // find the right color game #TODO
        let result = await ColorGame.find({});
        // let result2 = await ColorGame.findById({ image_ref: 'flagFR' });
        // console.log(result2);
        const newObj = {
            config: all_colors,
            game: result[0]
        }
        res.send(newObj);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;