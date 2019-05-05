// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Mugger = require("./mugger")
// const fetch = require("node-fetch");
// fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
//         .then(data => data.json())
//         .then(data => {
//             console.log(            
//                 data);
//     });
// mongoose.connect('mongo://localhost/moviedb');

// var conn = mongoose.connection;

// var Schema= mongoose.Schema;
// var MovieSchema = new Schema({
//     vote_count:Number,
//     id:Number,
//     video:Boolean,
//     vote_average:Number,
//     title:String,
//     popularity:Number,
//     poster_path:String,
//     original_language:String,
//     original_title:String,
//     genre_ids:Array,
//     backdrop_path:String,
//     adult:Boolean,
//     overview:String,
//     release_date:String
// })

// var Movie = mongoose.model('Movie',MovieSchema)

// var user = [{
//   a: 'abc',
//   _id: new ObjectID()
// }];

// conn.collection('upcoming_movies').insertMany(user);

// console.log('User:');
// console.log(user);


// const fetchNowPlayingMovies = () => {
//     conn.collection('upcoming_movies').deleteMany()
//     fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
//         .then(data => data.json())
//         .then(data => {
//             conn.collection('upcoming_movies').insertMany(data.results);
            
//     });
// }


// router.get("/Main", (req, res)=>{
//     fetchNowPlayingMovies();
//     res.send('1111');
    
//     // conn.collection('upcoming_movies').find({})
//     // .then(mugger => {
//     //     res.send(mugger);
//     //   });
// });
// var ObjectID = require('mongodb').ObjectID;
// router.get('/Main/:id', (req, res) => {
//     const id = req.params.id;
//     const details = {};
//     conn.collection('upcoming_movies').find({}, (err, item) => {
//       if (err) {
//         res.send({'error':'An error has occurred'});
//       } else {
//         res.json(item);
//         console.log(item);
        
//       } 
//     });
//   });


// router.post("/muggers", (req, res)=>{
//   Mugger.create(req)
//     .then(mugger => {
//       res.send(mugger);
//     });
// });

// router.put("/muggers/:id", (req, res)=>{
//   Mugger.findByIdAndUpdate({_id: req.params.id}, req.body)
//     .then(() => {
//       Mugger.findOne({_id: req.params.id})
//         .then(mugger => {
//           res.send(mugger);
//         });
//     });
// });

// router.delete("/muggers/:id", (req, res)=>{
//   Mugger.deleteOne({_id: req.params.id})
//     .then(mugger => {
//       res.send(mugger);
//     });
// });


// router.get('/Main',(req,res)=>{
//     console.log( conn.getCollection())
    
// })

// module.exports = router;

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:4000/";
// const dbName = 'moviedb';

// MongoClient.connect(url, { useNewUrlParser: true },  function(err, client) {
//   if (err) throw err;

//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   db.collection('upcoming_movies').findOne({}, function (findErr, result) {
//     if (findErr) throw findErr;
//     console.log(result);
//     client.close();
//   });
  //  const db = client.db(dbName);
  // // var dbo = db.db("moviedb");
  // // dbo.collection("upcoming_movies").findOne({}, function(err, result) {
  // //   if (err) throw err;
  // //   console.log(result.name);
  // //   db.close();
  // });