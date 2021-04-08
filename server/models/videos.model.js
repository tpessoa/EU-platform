const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videosSchema = new Schema(
  {
    category_id: { type: String, require: true },
    title: { type: String, require: true },
    description: String,
    url: { type: String, require: true },
  },
  { collection: "videos" }
);
const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;
