const router = require('express').Router();
const multer = require('multer');

const fs = require("fs");
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

const upload = multer();
router.post("/upload", upload.single("file"), async (req, res, next) => {
    const {
        file,
        body: { name }
    } = req;

    if (file.detectedFileExtension != ".jpg") next(new Error("Invalid file type!"));

    const fileName = name + file.detectedFileExtension;
    await pipeline(file.stream, fs.createWriteStream(`${__dirname}/../public/images/${fileName}`));

    res.send("File uploaded as " + fileName);
}); 


module.exports = router;