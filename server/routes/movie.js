const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.post('/add', function(req, res) {
    console.log(req.body.userId);
    Movie.findOne({
        id: req.body.id,
        userId:req.body.userId,
    }).then(movie => {
        if(movie) {
            return res.status(400).json({
            });
        }
        else {
            const newMovie = new Movie({
                userId:req.body.userId,
                title: req.body.title,
                overview:req.body.overview,
                poster_path: req.body.poster_path,
                runtime: req.body.runtime,
                id:req.body.id,
                type:req.body.type
            });
            newMovie
            .save()
            .then(movie => {
                res.json(movie)
            }); 
        }
    });
});

router.get("/getMovies/List", function(req, res){
    Movie.find({
        userId: req.query.userId,
        type: req.query.type
    }, function(err, movie){
        if(err) return console.log(err);
        res.send(movie);
    });
});



router.put("/updateMovies/Watched", function(req, res){
    Movie.findOne({
        userId: req.body.userId,
        title:req.body.title,
    },function(err, movie){
        if(err) return console.log(err);
        movie.type="Watched";
        movie
        .save()
        .then(movie=>{
            res.json(movie);
        })
    });
});

router.put("/updateMovies/Favorite", function(req, res){
    Movie.findOne({
        userId: req.body.userId,
        title:req.body.title,
    },function(err, movie){
        if(err) return console.log(err);
        movie.type="Favorite";
        movie
        .save()
        .then(movie=>{
            console.log(movie);
            res.json(movie);
        })
    });
});

router.delete('/remove', function(req, res) {
    Movie.findByIdAndRemove({
        _id: req.query._id,
    },function(err, movie){
        if(err) return console.log(err);
        movie
        .remove()
        .then(movie=>{
            res.json(movie);
        })
    });
});




module.exports = router;