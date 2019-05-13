const express = require('express');
const router = express.Router();

const Show = require('../models/Show');

router.post('/add', function(req, res) {
    Show.findOne({
        id: req.body.id,
        userId:req.body.userId,
    }).then(show => {
        if(show) {
            return res.status(400).json({
            });
        }
        else {
            const newShow = new Show({
                userId:req.body.userId,
                name: req.body.name,
                poster_path: req.body.poster_path,
                runtime: req.body.runtime,
                id:req.body.id,
                type:req.body.type,
                isShow:req.body.isShow,
                overview:req.body.overview,
            });
            newShow
            .save()
            .then(show => {
                res.json(show)
            }); 
        }
    });
});

router.delete('/remove', function(req, res) {
    Show.findByIdAndRemove({
        _id: req.query._id,
    },function(err, show){
        if(err) return console.log(err);
        show
        .remove()
        .then(show=>{
            console.log(show);
            res.json(show);
        })
    });
});


router.get("/getShows/List", function(req, res){
    Show.find({
        userId: req.query.userId,
        type: req.query.type
    }, function(err, show){
        if(err) return console.log(err);
        console.log(show);
        res.send(show);
        
    });
});



router.put("/updateShows/Watched", function(req, res){
    Show.findOne({
        userId: req.body.userId,
        name:req.body.name,
    },function(err, show){
        if(err) return console.log(err);
        show.type="Watched";
        show
        .save()
        .then(show=>{
            console.log(show);
            res.json(show);
        })
    });
});


router.put("/updateShows/Favorite", function(req, res){
    console.log(req.body.userId);
    Show.findOne({
        userId: req.body.userId,
        name:req.body.name,
    },function(err, show){
        if(err) return console.log(err);
        show.type="Favorite";
        show
        .save()
        .then(show=>{
            console.log(show);
            res.json(show);
        })
    });
});





module.exports = router;