const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShowSchema = new Schema({
    userId: {
        type: String,
    },
    name: {
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

const Show = mongoose.model('shows', ShowSchema);
module.exports = Show;