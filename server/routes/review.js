const express = require('express');
const router = express.Router();

const Review = require('../models/Review');

router.put('/add', function(req, res) {
    Review.findOne({
        title: req.body.title,
        userId:req.body.userId,
    }).then(review => {
        if(review) {
            review.review=req.body.review;
            review.save()
            .then(review => {
                res.json(review)
            }); 
        }
        else {
            const newReview = new Review({
                title:req.body.title,
                review: req.body.review,
                userId:req.body.userId,
            });
            newReview
            .save()
            .then(review => {
                res.json(review)
            }); 
        }
    });
});

router.get('/get', function(req, res) {
    Review.find({
        userId:req.query.userId,
    }, function(err, review){
        if(err) return console.log(err);
        res.send(review);
    });
});

module.exports = router;