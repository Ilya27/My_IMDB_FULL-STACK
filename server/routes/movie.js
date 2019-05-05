const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.post('/add', function(req, res) {
    Movie.findOne({
        id: req.body.id,
        userId:req.body.userId,
    }).then(movie => {
        if(movie) {
            return res.status(400).json({
            });
        }
        else {
            console.log(req.body);
            const newMovie = new Movie({
                userId:req.body.userId,
                title: req.body.title,
                poster_path: req.body.poster_path,
                runtime: req.body.runtime,
                id:req.body.id
            });
            newMovie
            .save()
            .then(movie => {
                res.json(movie)
            }); 
        }
    });
});

router.get("/getMovies", function(req, res){
    Movie.find({userId: req.query.userId}, function(err, movie){
        if(err) return console.log(err);
        console.log(movie);
        
        res.send(movie);
    });
});




module.exports = router;