const router = require('express').Router();
let ColorGame = require('../models/color_game.model');
let ConfigGames = require('../models/config_games.model');

router.route('/').get((req, res) => {
    res.send('JOGOS');
});

router.get('/color-game', async (req, res) => {
    try {
        let all_colors = await ConfigGames.find({name: 'color_game'});
        // find the right color game #TODO
        let result = await ColorGame.find({});
        const newObj = {
            config: all_colors[0],
            game: result[0]
        }
        res.send(newObj);
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;