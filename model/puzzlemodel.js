const mongoose = require('mongoose');

const puzzleschema = new mongoose.Schema({
    puzzle_name: { type: String },
    puzzle_image: { type: String },
    puzzle_char: { type: String },
    cat_id: { type: String },
    win_id: [{ type: String }] // Define win_id as an array of strings
});

module.exports = mongoose.model('puzzle', puzzleschema);