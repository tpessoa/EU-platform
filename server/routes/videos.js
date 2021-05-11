const router = require("express").Router();
let Categories = require("../models/categories.model");
let Videos = require("../models/videos.model");

/**
 * Get all categories
 */
router.get("/all-categories", async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.send(categories);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Get specific category by id
 */
router.get("/category/:id", async (req, res) => {
  try {
    const category = await Categories.findOne({
      _id: req.params.id,
    });
    res.send(category);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/add-category", async (req, res) => {
  try {
    // console.log(req.body);
    const newCategory = new Categories({
      ...req.body,
    });
    if (req.body._id) {
      newCategory.isNew = false;
    }
    await newCategory.save();
    console.log(newCategory);
    res.send(newCategory);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 *
 * Get all categories and their respective videos
 */
router.get("/get_categories_and_videos", async (req, res) => {
  try {
    const categoriesData = [];

    const categoriesArr = await Categories.find({
      category_ref_name: "video",
    });
    // cycle for reading in sequence
    for (const category of categoriesArr) {
      const videosArr = await Videos.find({ category_id: category._id });
      categoriesData.push({
        categoryData: category,
        categoryVideos: videosArr,
      });
    }
    res.send(categoriesData);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Get all video categories
 */
router.get("/categories/type/:ref", async (req, res) => {
  try {
    let category = await Categories.find({ category_ref_name: req.params.ref });
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
  try {
    const {
      category_ref_id,
      category_ref_name,
      title,
      description,
      thumbnail,
    } = req.body;

    const newCategory = new Categories({
      category_ref_id: category_ref_id,
      category_ref_name: category_ref_name,
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
  try {
    const { title, description, thumbnail } = req.body;
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

/**
 * Delete category by ID
 */
router.delete("/category/:id", async (req, res) => {
  try {
    let deletedCategory = await Categories.deleteOne({ _id: req.params.id });
    res.send(deletedCategory);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * get all videos of one category by ID
 */
router.get("/:categoryId", async (req, res) => {
  try {
    const videos = await Videos.find({
      category_id: req.params.categoryId,
    });
    res.send(videos);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * get video by ID
 */
router.get("/video/:id", async (req, res) => {
  try {
    const video = await Videos.findOne({
      _id: req.params.id,
    });
    res.send(video);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Create video
 */
router.post("/video/add", async (req, res) => {
  try {
    const { categoryId, title, description, url } = req.body;
    const newVideo = new Videos({
      category_id: categoryId,
      title: title,
      description: description,
      url: url,
    });
    await newVideo.save();

    res.send(newVideo);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Update video by ID
 */
router.post("/video/:id", async (req, res) => {
  try {
    const { categoryId, title, description, url } = req.body;
    let video = await Videos.findOne({ _id: req.params.id });
    video.category_id = categoryId;
    video.title = title;
    video.description = description;
    video.url = url;

    await video.save();

    res.send(video);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

/**
 * Delete video by ID
 */
router.delete("/video/:id", async (req, res) => {
  try {
    let deletedVideo = await Videos.deleteOne({ _id: req.params.id });
    res.send(deletedVideo);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
