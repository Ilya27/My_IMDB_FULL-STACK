// // // // const express = require("express");
// // // // const mongoose = require("mongoose");
// // // // const bodyParser = require("body-parser");
// // // // const app = express();
// // // // const fetch = require("node-fetch");


// // // // mongoose.connect("mongodb://localhost/moviedb", { useNewUrlParser: true });



// // // // app.use(bodyParser.json());


// // // // app.use("/", require("./api"));

// // // // app.listen(4000, ()=>{
// // // //   console.log("server is listening");
// // // // });


// // // // Импортировать модуль mongoose
// // // var mongoose = require('mongoose'); 

// // // // Установим подключение по умолчанию
// // // var mongoDB = 'mongodb://127.0.0.1/moviedb';
// // // mongoose.connect(mongoDB, { useNewUrlParser: true });
// // // // Позволим Mongoose использовать глобальную библиотеку промисов
// // // mongoose.Promise = global.Promise;
// // // // Получение подключения по умолчанию 
// // // var db = mongoose.connection;

// // // // Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
// // // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // var express = require('express');
// // var app = express();

// // app.get('/', function(req, res) {
// //   res.send('Hello World!');
// // });

// // app.listen(5000, function() {
// //   console.log('Example app listening on port 4000!');
// // });


// // var MongoClient = require('mongodb').MongoClient;

// // MongoClient.connect('mongodb://localhost:27017/moviedb', function(err, db) {
// //   if (err) throw err;

// //   db.collection('upcoming_movies').find().toArray(function (err, result) {
// //     if (err) throw err;

// //     console.log(result);
// //   });
// // });


// var express = require('express');
// var app = express();
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost/EmployeeDB';
// var str = "";

// app.route('/Employeeid').get(function(req, res)

//     {
//         MongoClient.connect(url, function(err, db) {
//             var cursor = db.collection('Employee').find();
//             //noinspection JSDeprecatedSymbols
//             cursor.each(function(err, item) {

//                 if (item != null) {
//                     str = str + "    Employee id  " + item.Employeeid + "</br>";
//                 }
//             });
//             res.send(str);
//             db.close();
//         });
//     });

// var server = app.listen(3000, function() {}); 
// const fetch = require('node-fetch');
// var express = require('express');
// var app = express();
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost/";
// const dbName = 'moviedb'
// assert = require('assert');
// app.route('/Main').get(function(req, res)
//     {

//       fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
//         .then(data => data.json())
//         .then(data => {
//           res.send(data.results);  
//     })
//     .catch(err => {
//       res.redirect('/error');
//     });
//     });

// var server = app.listen(3000, function() {}); 


// const express = require('express');
// const app = express();
// const port = 5000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// app.get('/', (req, res) => {
// 	res.send('PORT 5000');
// })


// app.listen(port, (err) => {
// 	if(err) { console.log(err) };
// 	console.log('Listening on port ' + port);
// })

// const fetch = require('node-fetch');

// module.exports = (app) => {

// 	// let zipcode;

// 	// app.post('/search-location', (req, res) => {

// 	// 	zipcode = req.body.zipcode;

// 	// 	if(!zipcode || zipcode.length < 5 || zipcode.length > 5) {
// 	// 		res.redirect('/error');
// 	// 	} else { 
// 	// 		res.redirect('/current-weather');
// 	// 	}
// 	// })

// 	app.get('/', (req, res) => {	
//     fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
//             .then(data => data.json())
//             .then(data => {
//               res.send(data.results);  
//         })
//         .catch(err => {
//           res.redirect('/error');
//         });
//   })
  
// };
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db/db');
const fetch = require('node-fetch');
const cors = require('cors');
const users = require('./routes/user'); 
const movies = require('./routes/movie'); 
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/users', users);
app.use('/api/movies', movies);

app.get('/upcoming_movies', (req, res) => {	
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
  .then(data => data.json())
  .then(data => {
    res.send(data);  
  })
})

app.get('/upcoming_shows', (req, res) => {	
  fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=1`)
  .then(data => data.json())
  .then(data => {
    res.send(data);  
  })
})

app.get('/:type/:state/:activePage', (req, res) => {	
  let {type,state,activePage}=req.params;
  fetch(`https://api.themoviedb.org/3/${type}/${state}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&page=${activePage}`)
  .then(data => data.json())
  .then(data => {
    res.send(data);  
  })
})

app.get('/:value', (req, res) => {	
  let {value}=req.params;
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=dcf025b227cc290e6845162a216870ff&language=en-US&query=${value}&page=1&include_adult=false`)
  .then(data => data.json())
  .then(data => {
    res.send(data);  
  })
})



const port =4000;

app.listen(port,()=>{
  console.log(`Live  on port ${port}`)
})
