const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const server = express();
const path = require('path');
const fs = require('fs');
const http = require('http');

const databaseName = 'databaseName';
const collectionName = 'collectionName';
const MongoClient = require('mongodb').MongoClient;

/* next: generateData function
takes a number parameter to
specify number of mock products
to add to database: */

const generateData = require('./mockData').generateData;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Could not connect! Error: ', err);
        return;
    }
//const url = 'mongodb://127.0.0.1:27017';
const db = client.db(databaseName);
const catalogue = db.collection(collectionName);
})

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
    res.send("Api call")
})

server.get('*', (req, res) => {
    return handle(req, res)
})

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})
