const router = require("express").Router();
let Categories = require("../models/categories.model");

/**
 * Get all categories
 */
router.get("/categories", async (req, res) => {
  try {
    let category = await Categories.find({});
    res.send(category);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Get category (video or poll) by ID
 */
router.get("/categories/:id", async (req, res) => {
  try {
    let category = await Categories.findOne({
      _id: req.params.id,
    });
    res.send(category);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Create category (video or poll) by ID
 */
router.post("/categories/add", async (req, res) => {
  const {
    category_ref_id,
    category_ref_name,
    title,
    description,
    thumbnail,
  } = req.body.obj;

  try {
    const newCategory = new Categories({
      game_ref_id: category_ref_id,
      game_ref_name: category_ref_name,
      title: title,
      description: description,
      thumbnail: { ...thumbnail },
    });
    await newCategory.save();

    res.send(newCategory);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Update category (video or poll) by ID
 */
router.post("/categories/:id", async (req, res) => {
  const { title, description, thumbnail } = req.body.obj;

  try {
    let category = await Categories.findOne({ _id: req.params.id });
    category.title = title;
    category.description = description;
    category.thumbnail = { ...thumbnail };

    await category.save();

    res.send(category);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
