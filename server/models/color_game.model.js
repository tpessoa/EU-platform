const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorGameSchema = new Schema(
    {
        title: String,
        src_original: String,
        src_painting: String,
        image_ref: String,
        colors: Array
    },
    { collection: 'color_game' }
);
const ColorGame = mongoose.model('ColorGame', colorGameSchema);

module.exports = ColorGame;
