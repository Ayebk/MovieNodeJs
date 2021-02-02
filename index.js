




// Define a server
const PORT = 3000;
const express = require('express');
const server = express();
const cors = require('cors');


//const dbService = require('./dbService');

const dbService = require('./dbService');


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended : false }));



/*
// create
server.post('/insert', (request, response) => {
    const { name } = request.body;
    
    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

*/




// read
server.get('/getAll', (request, response) => {

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
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










// read
server.get('/getAll', (request, response) => {
    console.log('test1');
})

server.listen(PORT, () => {
    console.log(`server is listenning on port: ${PORT}`);    
});


