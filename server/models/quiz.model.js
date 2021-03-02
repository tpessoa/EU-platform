const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema(
    {
        title: String,
        input: Array,
        timer: Boolean,
        time_to_resp_question: Number,
        has_audio: Boolean,
    },
    { collection: 'quiz' }
);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
