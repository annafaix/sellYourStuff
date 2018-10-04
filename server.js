const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const server = express();
const path = require('path');
const fs = require('fs');
const http = require('http');

const databaseName = 'sellyourstuff';
const collectionName = 'collectionName';
const MongoClient = require('mongodb').MongoClient;
// url här under tillåter CRUD
const urlLoggedIn = 'mongodb://feu17:Hejhej1234@ds119503.mlab.com:19503/sellyourstuff';
// url här under tillåter EJ CRUD utan bara läs-funktionaliteten
const urlNotLoggedIn = 'mongodb://notLoggedIn:Hejhej1234@ds119503.mlab.com:19503/sellyourstuff'

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

const connectToMongo = (req,collection) => {
    let isLoggedIn = req.params.isLoggedIn;
    let url;
    let catalogue;
    let url = isLoggedIn ? urlLoggedIn : urlNotLoggedIn;

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('Could not connect! Error: ', err);
            return;
        }
        console.log('Connected to mongo database.')

        var db = client.db(databaseName);
        catalogue = db.collection(collection);
    })
    return catalogue;
}

server.use((req, res, next) => {
    res.send('Hello, I am a server who has been called: ');
    next()
})
server.post('/api/:isLoggedIn', (req, res) => {

/*

    let collection = req.query.collection; --> '?collection=user01'

    connectToMongo(req, collection).insertOne(data, (err) => {
        if (err) {
            console.log(err);
            client.close();
            return;
        }
        console.log('Inserted data...');
        client.close();
    })

    */
})

server.get('*', (req, res) => {
    return handle(req, res)
})

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})