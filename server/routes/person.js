const express = require('express');
const router = express.Router();

const Person = require('../models/Person');

router.post('/add', function(req, res) {
    Person.findOne({
        id: req.body.id,
        userId:req.body.userId,
    }).then(person => {
        if(person) {
            return res.status(400).json({
            });
        }
        else {
            const newPerson = new Person({
                userId:req.body.userId,
                name: req.body.name,
                profile_path: req.body.profile_path,
                biography: req.body.biography,
                id:req.body.id,
                type:req.body.type
            });
            newPerson
            .save()
            .then(person => {
                res.json(person)
            }); 
        }
    });
});

router.delete('/remove', function(req, res) {
    console.log(req.query._id);
    
    Person.findByIdAndRemove({
        _id: req.query._id,
    },function(err, person){
        if(err) return console.log(err);
        person
        .remove()
        .then(person=>{
            console.log(person);
            res.json(person);
        })
    });
});



router.get("/getPerson/List", function(req, res){
    Person.find({
        userId: req.query.userId,
        type: req.query.type
    }, function(err, person){
        if(err) return console.log(err);
        res.send(person);
    });
});




module.exports = router;