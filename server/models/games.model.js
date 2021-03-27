const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema(
  {
    game_ref_id: { type: Number, require: true },
    game_ref_name: { type: String, require: true },
    title: { type: String, require: true },
    description: String,
    age: { type: Object, require: true },
    difficulty: { type: Number, require: true },
    assets: {
      images: { type: Object, require: true },
      sounds: { type: Object, require: true },
    },
    config: { type: Object, require: true },
  },
  { collection: "games" }
);
const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;
