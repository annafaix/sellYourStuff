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

const connectToMongo = (isLoggedIn, options, callback, res, myCatalogue) => {
    let url;
    isLoggedIn == 'true' ? url = urlLoggedIn : url = urlNotLoggedIn;

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('Could not connect! Error: ', err);
            return;
        }
        console.log('Connected to mongo database.')

        var db = client.db(databaseName);
        let catalogue = db.collection(myCatalogue);
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
const filterFunction = (catalogue, filter, res, client, closeClient) =>{
    // Jobbar med aggregation
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
// försätt senare :
server.get('/api/getOverview', (req,res) => {
    let getOverview = () => {
        db.collection(productCollection).aggregate([{$group: {_id: "$category", amount: {$sum: "1" }}}, 
        {$group: {_id: null, max: {$max: "$price" }, max: {$min: "$price" }}}], (err,docs) => {
            if (err) {
                console.log('Could not filter due to: ', err);
                client.close();
                return;
            } else {
                docs.max = docs[1].max;
                docs.min = docs[1].min;
                docs.categories = docs[0];
            }
            res
                .send(docs)
                .end();
            }, closeClient)
    }
    connectToMongo(false, null, getOverview, res, productCollection);
});

server.get('/api/filter/:filter', (req, res) => {
    let filter = JSON.parse("{" + req.params.filter + "}");
    connectToMongo(false, filter, filterFunction, res, productCollection);
})

server.post('/api/signUp/:isLoggedIn', jsonParser, (req, res) => {
    console.log('body: ', req.body);
    let isLoggedIn = req.params.isLoggedIn;
    let user = JSON.parse(req.body);
    console.log('user passed through: ', user)
    connectToMongo(isLoggedIn, user, userExists, res, userCollection);
})

//Marie Louise Leblanc testar


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
        if(returnList !== null){
          console.log("closing")
          client.close()
          console.log(returnList[0])
          res.header("Access-Control-Allow-Origin", '*')
          console.log("sending")
          res.send(returnList)
        }
      })
    })
})

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})
