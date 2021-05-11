const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    title: { type: String, require: true },
    description: String,
    thumbnail: { type: Object, require: true },
  },
  { collection: "categories" }
);
const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
