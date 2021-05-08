const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    thumbnail: { type: Object, require: true },
  },
  { collection: "polls" }
);
const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
