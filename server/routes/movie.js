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
            const newMovie = new Movie({
                userId:req.body.userId,
                title: req.body.title,
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
    }, async function(err, movie){
        if(err) return console.log(err);
        console.log(movie);
        await res.send(movie);
        
    });
});



router.put("/updateMovies/List", function(req, res){
    Movie.findOne({
        userId: req.body.userId,
        title:req.body.title,
    },function(err, movie){
        if(err) return console.log(err);
        movie.type="Watched";
        movie
        .save()
        .then(movie=>{
            console.log(movie);
            res.json(movie);
        })
    });
});



module.exports = router;