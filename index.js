




// Define a server
const PORT = 65000;
const express = require('express');
let server = express();
let cors = require('cors');
let bodyParser = require('body-parser');
server.use(cors('*'))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
const { request, response } = require('express');
server.options('*', cors());

var user = require('./routes/User');
var movie = require('./routes/Movie');
var review = require('./routes/Review');

server.use('/user',user);
server.use('/movie',movie);
server.use('/review',review);

const dbService = require('./routes/dbService');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// read
server.get('/getAllMovies', (request, response) => {
    var json = require('./movies.json');
    response.send(json)
})

// update
server.patch('/update', (request, response) => {
    const { id, name } = request.body;

    const result = db.updateReviewById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
server.delete('/delete/:id', (request, response) => {
    const { id } = request.params;

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

server.get('/search/:name', (request, response) => {
    const { name } = request.params;

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})










// greeting for debuging purposes
server.get('/greeting', (request, response) => {
    
    response.send("Hello there!");
})

//get all movies in an array
server.get('/getAllMovies', (request, response) => {
    var json = require('./movies.json')
    response.send(json);
})

server.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});


