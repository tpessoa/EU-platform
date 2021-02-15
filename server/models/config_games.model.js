const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigGamesSchema = new Schema(
    {
       name: String,
       colors: Array
    },
    { collection: 'config_games' }
);
const ConfigGames = mongoose.model('ConfigGames', ConfigGamesSchema);

module.exports = ConfigGames;
