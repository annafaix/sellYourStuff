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
const userCollection = 'users';
const productCollection = 'products';
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

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const connectToMongo = (isLoggedIn, options, callback, res, collection) => {
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
        catalogue = db.collection(collection);
        let closeClient = () => {
            client.close();
            console.log('Connection closed.');
        }
        callback(catalogue, options, res, client, closeClient);
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

const getPriceRange = (catalogue, options, res, client, closeClient) => {
    console.log('hello')
    let cursor = catalogue.aggregate([{ $match: {}}
    ,{ $group: { _id: null, max: { $max: "$price" }, min: { $min: "$price" } } }]);
    cursor.on('data', function(doc) {
        res.send(doc)
        res.end()
    })
    cursor.once('end', function(){
        closeClient
    })
}

const filterFunction = (catalogue, filter, res, client, closeClient) => {
    catalogue.find(filter).toArray((err, docs) => {
        if (err) {
             console.log('Could not filter due to: ', err);
             client.close();
             return;
         } else {
             console.log('Matched the following products: ', docs);
         }
        res
            .send(docs)
            .end();
        }, closeClient)
}

server.get('/api/filter/:filter', (req,res) => {
    let filter = JSON.parse(req.params.filter);
    connectToMongo('false', filter, filterFunction, res, productCollection);
});

server.get('/api/getPriceRange', (req, res) => {
    connectToMongo('false', {}, getPriceRange, res, productCollection);
});


server.post('/api/signUp/:isLoggedIn', jsonParser, (req, res) => {
    console.log('body: ', req.body);
    let isLoggedIn = req.params.isLoggedIn;
    let user = JSON.parse(req.body);
    console.log('user passed through: ', user)
    connectToMongo(isLoggedIn, user, userExists, res, userCollection);
})
//Anna testar


server.get('/mock', (req, res) => {
    console.log("api")
    //let mockList = generateData(10);

    MongoClient.connect(urlLoggedIn, { useNewUrlParser: true }, (err, client) => {
        let db = client.db(databaseName)
        let catalogue = db.collection(productCollection)
        if (err) {
            console.log('Could not connect! Error: ', err);
            client.close();
        }
        console.log('Connected to mongo database.')
        //generateData(10, catalogue)
        //catalogue.insertMany(mockList)
        client.close()
    })
})

server.get('/api/products', (req, res) => {
    let returnList = null;
    MongoClient.connect(urlLoggedIn, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('Could not connect! Error: ', err);
            client.close();
        }
        let db = client.db(databaseName)
        let catalogue = db.collection(productCollection)
        console.log('Connected to mongo database.')
        catalogue.find().toArray((err, result) => {
            /*result.forEach((item) => {
              returnList.push(item)
              console.log(returnList[0])
            })*/
            console.log("inserting result")
            returnList = result;
            if (returnList !== null) {
                console.log("closing")
                console.log(returnList[0])
                console.log("sending")

            }
            res.header("Access-Control-Allow-Origin", '*')
            res.send(returnList)
            res.end()
        }, () => { client.close() })
    })
})
  

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})
