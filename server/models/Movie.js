const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
    },
    poster_path: {
        type: String,
    },
    runtime: {
        type: Number,
    },
    id: {
        type: Number
    },
    type:{
        type: String
    }
});

const Movie = mongoose.model('movies', MovieSchema);
module.exports = Movie;