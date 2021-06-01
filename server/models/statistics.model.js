const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statisticsSchema = new Schema(
  {
    game_id: { type: String, require: true },
    game_ref_name: { type: String, require: true },
    total_answers: { type: Object, require: true },
  },
  { collection: "statistics" }
);
const Statistics = mongoose.model("Statistics", statisticsSchema);

module.exports = Statistics;
