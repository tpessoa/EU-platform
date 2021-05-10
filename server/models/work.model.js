const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema(
  {
    poll_id: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    photo: { type: Object, require: true },
  },
  { collection: "works" }
);
const Work = mongoose.model("Work", workSchema);

module.exports = Work;
