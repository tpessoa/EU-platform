const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    game_ref_id: { type: Number, require: true },
    game_ref_name: { type: String, require: true },
    title: { type: String, require: true },
    description: String,
    thumbnail: { type: Object, require: true },
  },
  { collection: "categories" }
);
const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
