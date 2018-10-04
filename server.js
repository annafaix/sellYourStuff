const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const server = express();
const path = require('path');
const fs = require('fs');
const http = require('http');

const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'databaseName';
const collectionName = 'collectionName';
const db = client.db(databaseName);
const catalogue = db.collection(collectionName);

/* next: generateData function
takes a number parameter to 
specify number of mock products 
to add to database: */

const generateData = require('./mockData').generateData;

// 

/* For Uploading Files:

const multer = require('multer');
const upload = multer({
    dest: "./temp"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

*/

server.use((req, res, next) => {
    res.send('Hello, I am a server who has been called: ');
    next()
})
server.get('/api', (req, res) => {
    //
})




server.get('*', (req, res) => {
    return handle(req, res)
})

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})