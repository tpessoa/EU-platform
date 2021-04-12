const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesSchema = new Schema(
  {
    image: { type: Object, require: true },
    linked_obj_id: { type: String, require: true },
    input_ref: { type: String, require: true },
  },
  { collection: "images" }
);
const Images = mongoose.model("Images", imagesSchema);

module.exports = Images;
