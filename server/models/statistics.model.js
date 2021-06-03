const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statisticsSchema = new Schema(
  {
    game_id: { type: String, require: true },
    game_ref_name: { type: String, require: true },
    all_answers: { type: Array, require: true },
    user_time_arr: { type: Array, require: true },
    num_opened: { type: Number, require: true },
    num_finished: { type: Number, require: true },
    num_wins: { type: Number, require: true },
  },
  { collection: "statistics" }
);
const Statistics = mongoose.model("Statistics", statisticsSchema);

module.exports = Statistics;
