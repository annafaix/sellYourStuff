const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const server = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.text();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const databaseName = 'sellyourstuff';
const collectionName = 'users';
const MongoClient = require('mongodb').MongoClient;
// url här under tillåter CRUD
const urlLoggedIn = 'mongodb://feu17:Hejhej1234@ds119503.mlab.com:19503/sellyourstuff';
// url här under tillåter EJ CRUD utan bara läs-funktionaliteten
const urlNotLoggedIn = 'mongodb://notLoggedIn:Hejhej1234@ds119503.mlab.com:19503/sellyourstuff';

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

const connectToMongo = (isLoggedIn, user, callback, res) => {
    let catalogue;
    let url;
    isLoggedIn == 'true' ? url = urlLoggedIn : url = urlNotLoggedIn;

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('Could not connect! Error: ', err);
            return;
        }
        console.log('Connected to mongo database.')

        var db = client.db(databaseName);
        catalogue = db.collection(collectionName);
        let closeClient = () => {
            client.close();
            console.log('Connection closed.');
        }
        callback(catalogue, user, res, client, closeClient);
    })
}
const userExists = (catalogue, user, res, client, closeClient) => {
    let email = user.email;
    console.log(email)
    catalogue.find({ email: email }).toArray((err, docs) => {
        console.log('The products are: ', docs);
 if (docs.length < 1) {
            console.log('The products are: ', docs);
            catalogue.insertOne(user, (err, response) => {
                if (err) {
                    console.log('Could not use query insertOne: ', err);
                    client.close();
                    return;
                } else {
                    console.log('Successfully signed up new user: ', response);
                }
                res
                    .send(response)
                    .end();
            }, closeClient)
        }
    })
}

server.post('/api/signUp/:isLoggedIn', jsonParser, (req, res) => {
    console.log('body: ', req.body);
    let isLoggedIn = req.params.isLoggedIn;
    let user = JSON.parse(req.body);
    console.log('user passed through: ', user)
    connectToMongo(isLoggedIn, user, userExists, res);
})

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})
