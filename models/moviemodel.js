const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    rating: {
        type: Number,
        require: true
    }
    ,
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;