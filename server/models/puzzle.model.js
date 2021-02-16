const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puzzleSchema = new Schema(
    {
        title: String,
        src: String,
        image_ref: String,
        piece_size: String
    },
    { collection: 'puzzle' }
);
const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
