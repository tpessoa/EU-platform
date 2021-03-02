const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSearchSchema = new Schema(
    {
        title: String,
        input: Array,
        directions: Array,
        num_horizontal_cells: Number,
        num_vertical_cells: Number,
        timer: Boolean,
        time_to_complete: Number,
        ref: String
    },
    { collection: 'word_search' }
);
const WordSearch = mongoose.model('WordSearch', wordSearchSchema);

module.exports = WordSearch;
