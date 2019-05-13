const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db/db');
const fetch = require('node-fetch');
const cors = require('cors');
const users = require('./routes/user'); 
const movies = require('./routes/movie');
const shows = require('./routes/show');  
const persons = require('./routes/person'); 
const reviews = require('./routes/review'); 
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());


app.use('/api/users', users);
app.use('/api/reviews', reviews);
app.use('/api/movies', movies);
app.use('/api/shows', shows);
app.use('/api/persons', persons);

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

const port = 4000;

app.listen(port,()=>{
  console.log(`Live  on port ${port}`)
})
