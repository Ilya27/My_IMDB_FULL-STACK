const express = require('express');
const router = express.Router();

const Show = require('../models/Show');

router.post('/add', function(req, res) {
    Show.findOne({
        id: req.body.id,
        userId:req.body.userId,
    }).then(movie => {
        if(movie) {
            return res.status(400).json({
            });
        }
        else {
            console.log(req.body);
            const newShow = new Show({
                userId:req.body.userId,
                name: req.body.name,
                poster_path: req.body.poster_path,
                runtime: req.body.runtime,
                id:req.body.id,
                type:req.body.type
            });
            newShow
            .save()
            .then(show => {
                res.json(show)
            }); 
        }
    });
});

router.get("/getShow/List", function(req, res){
    Show.find({
        userId: req.query.userId,
        type: req.query.type
    }, function(err, show){
        if(err) return console.log(err);
        res.send(show);
    });
});




module.exports = router;