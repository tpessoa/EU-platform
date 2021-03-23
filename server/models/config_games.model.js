const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfigGamesSchema = new Schema(
  {
    game_type: { type: String, require: true },
    colors: Object,
    img_paths: Array,
  },
  { collection: "config_games" }
);
const ConfigGames = mongoose.model("ConfigGames", ConfigGamesSchema);

module.exports = ConfigGames;
