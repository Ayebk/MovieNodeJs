// Define a server
const PORT = 3000;
const express = require('express');
const server = express();
const cors = require('cors');


//const dbService = require('./dbService');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended : false }));








// read
server.get('/getAll', (request, response) => {
    console.log('test1');
})

server.listen(PORT, () => {
    console.log(`server is listenning on port: ${PORT}`);    
});


