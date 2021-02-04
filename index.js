




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
var watched = require('./routes/Watched');

server.use('/user', user);
server.use('/movie', movie);
server.use('/review', review);
server.use('/watched', watched);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});


