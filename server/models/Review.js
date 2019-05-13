const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
    },
    review:{
        type:String
    }
});

const Review = mongoose.model('reviews', ReviewSchema);
module.exports = Review;