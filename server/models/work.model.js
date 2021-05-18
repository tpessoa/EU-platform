const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema(
  {
    poll_id: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    author: { type: String, require: true },
    photo: { type: Object, require: true },
    votes: { type: Array },
  },
  { collection: "works" }
);
const Work = mongoose.model("Work", workSchema);

module.exports = Work;
