const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // store the file
    cb(null, true);
  } else {
    // reject the file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // accepts 10 MB
  },
  fileFilter: fileFilter,
});

router.post("/uploadImg", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  res.send("uploa d");
  // store the path to the img
  // file.path
});

router.get("/uploadImg", (req, res) => {
  res.send("ola");
});

router.get("/", (req, res) => {
  res.send("ola admin");
});

// const multer = require("multer");

// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

// const upload = multer();
// router.post("/upload", upload.single("file"), async (req, res, next) => {
//   const {
//     file,
//     body: { name },
//   } = req;
//   console.log("sdfsd");
//   console.log(req.name);
//   //   console.log(req.file);
//   console.log("server uploading");

//     if (file.detectedFileExtension != ".jpg")
//       next(new Error("Invalid file type!"));

//       const fileName = name + file.detectedFileExtension;
//       await pipeline(
//         file.stream,
//         fs.createWriteStream(`${__dirname}/../public/images/${fileName}`)
//       );

//     res.send("File uploaded as " + fileName);
// });

module.exports = router;
