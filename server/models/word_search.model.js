const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSearchSchema = new Schema(
    {
        title: String,
        src: String,
        image_ref: String,
        piece_size: String
    },
    { collection: 'wordSearch' }
);
const WordSearch = mongoose.model('WordSearch', wordSearchSchema);

module.exports = WordSearch;
