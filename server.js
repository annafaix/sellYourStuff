const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const server = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
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

let ObjectID = require('mongodb').ObjectID;

let userId = "";
//
/* For Uploading Files:
const multer = require('multer');
const upload = multer({
    dest: "./temp"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
*/

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT")
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
    //console.log(email)
    catalogue.find({ email: email }).toArray((err, docs) => {
        //console.log('The 1 products are: ', docs);
        if (docs.length < 1) {
            //console.log('The 2 products are: ', docs);
            catalogue.insertOne(user, (err, response) => {
                if (err) {
                    //console.log('Could not use query insertOne: ', err);
                    client.close();
                    return;
                } else {
                    //console.log('Successfully signed up new user: ', response);
                }
                res.header("Access-Control-Allow-Origin", '*')
                res
                    .send(response)
                    .end();
            }, closeClient)
        }
        let id = docs[0]["_id"];
        userId = id;
        console.log("userId is", userId);
        res.send(docs)
        res.end()
    })
}

const getPriceRange = (catalogue, options, res, client, closeClient) => {
    console.log('hello')
    let cursor = catalogue.aggregate([{ $match: {} }
        , { $group: { _id: null, max: { $max: "$price" }, min: { $min: "$price" } } }]);
    cursor.on('data', function (doc) {
        res.send(doc)
        res.end()
    })
    cursor.once('end', function () {
        closeClient
    })
}

const filterFunction = (catalogue, options, res, client, closeClient) => {
    console.log('options: ', options)
    let list = [];
    if (options.category != 'all' && options.myMin != undefined) {
        console.log('called with a category and price range')
        let cursor = catalogue.aggregate([{
            $match: {
                category: options.category,
                price: {
                    $gt: options.myMin,
                    $lt: options.myMax
                }
            }
        }]);
        cursor.on('data', function (doc) {
            console.log('filter result: ', doc)
            list.push(doc);
        })
        cursor.once('end', function () {
            res.send(list)
            res.end()
            closeClient
        })
    }
    else if (options.category == 'all' && options.myMin != undefined) {
        console.log('called with all categories and price range')
        let list = [];
        let cursor = catalogue.aggregate([{
            $match: {
                price: {
                    $gt: options.myMin,
                    $lt: options.myMax
                }/*, price: {
                    $lt: options.myMax
                }*/
            }
        }]);
        cursor.on('data', function (doc) {
            console.log('filter result: ', doc)
            list.push(doc);
        })
        cursor.once('end', function () {
            res.send(list)
            res.end()
            closeClient
        })
    } else if (options.category != 'all' && options.myMin == undefined) {
        console.log('called with a category and price range')
        let cursor = catalogue.aggregate([{
            $match: {
                category: options.category,
            }
        }]);
        cursor.on('data', function (doc) {
            console.log('filter result: ', doc)
            list.push(doc);
        })
        cursor.once('end', function () {
            res.send(list)
            res.end()
            closeClient
        })
    }
    /*catalogue.find(filter).toArray((err, docs) => {
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
    }, closeClient)*/
}

const buyFunction = (catalogue, cart, res, client, closeClient) => {
  let newArray = cart.map(item => {
    console.log("THIS IS ITEM: ", item.id)
    return ObjectId(item.id)
  })
  let query = {_id: {$in: newArray}};
  catalogue.find(query).toArray((err, doc) => {
    console.log(doc)
  })
  catalogue.deleteMany(query, (err, result) => {
    if (err) {
      throw err
    }
    console.log(result)
    res.send(result)
  }, closeClient)
}

server.post('/api/buy', jsonParser, (req, res) => {
  let cart = JSON.parse(req.body);
  console.log(cart)
  connectToMongo('true', cart, buyFunction, res, productCollection);
})

server.get('/api/filter/:category/', urlencodedParser, (req, res) => {
    let options = {};
    let category = req.params.category;
    options.category = category
    if (req.query.myMin != undefined) {
        options.myMin = Number(req.query.myMin);
        options.myMax = Number(req.query.myMax)
    } else { console.log('throw err') }
    connectToMongo('false', options, filterFunction, res, productCollection)
})

const getUsersId = (catalogue, userId, res, client, closeClient) => {
    catalogue.find(userId).toArray((err, result) => {
        console.log(result)
        res.set({
            "Access-Control-Allow-Origin": '*',
            'Content-Type': 'text/html'
        })
        res.send(result[0])
        res.end()
    }, () => { client.close() })
}

const updateUser = (catalogue, { detail, setDocument }, res, client, closeClient) => {
    // let db = client.db(databaseName)
    // let catalogue = db.collection(userCollection)
    console.log('Connected to mongo database for real.')

    catalogue.updateOne(detail, setDocument, (err, result) => {
        res.set({
            "Access-Control-Allow-Origin": '*'
        })
        res.send(result)
        res.end()
    }, () => { client.close() })
}

const searchFunction = (catalogue, filter, res, client, closeClient) => {
    catalogue.find({ $contains: { "name": filter } }).toArray((err, docs) => {
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

const getInitialProps = (catalogue, filter, res, client, closeClient) => {
    let returnList = null;
    let db = client.db(databaseName)
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
            //console.log(returnList[0])
            console.log("sending")
        }
        res.header("Access-Control-Allow-Origin", '*')
        res.send(returnList)
        res.end()
    }, closeClient)
}

const findUserProducts = (catalogue, filter, res, client, closeClient) => {
  let returnList = null;
  console.log(filter)
  catalogue.find({userName: filter}).toArray((err, result) => {
    returnList = result;
    console.log("finduserprod: ", returnList[(Math.floor(Math.random()*5))])
    res.header("Access-Control-Allow-Origin", '*')
    res.send(returnList)
    res.end
  }, closeClient)
}

server.get('/api/getPriceRange', (req, res) => {
    connectToMongo('false', {}, getPriceRange, res, productCollection);
});
server.get('/api/userProducts/:user', (req, res) => {
  let user = req.params.user
  connectToMongo('true', user, findUserProducts, res, productCollection)
})

server.post('/api/search', jsonParser, (req, res) => {
    //let searchText = JSON.stringify(req.body);
    //console.log('server get request from search comp ' + req.body);
    connectToMongo('false', req.body, searchFunction, res, productCollection);
    res.header("Access-Control-Allow-Origin", '*');
    res.send({ success: true });
    res.end();
});

server.post('/api/signUp/:isLoggedIn', jsonParser, (req, res) => {
    //console.log('body: ', req.body);
    let isLoggedIn = req.params.isLoggedIn;
    let user = JSON.parse(req.body);
    //console.log('user passed through: ', user)
    connectToMongo(isLoggedIn, user, userExists, res, userCollection);
})

//Anna testar update user by id

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const detail = { "id": id };
    connectToMongo('true', detail, getUsersId, res, userCollection)
})

server.put('/api/user/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    let body = (req.body);
    const detail = { "_id": new ObjectID(id) };
    let setDocument = { $set: { "about": req.body } };
    connectToMongo('true', { detail, setDocument }, updateUser, res, userCollection)

})
// Anna har testat färdigt

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
        client.close()
    })
})

server.get('/api/products', (req, res) => {
    connectToMongo('false', {}, getInitialProps, res, productCollection)
})

const port = 3000;
server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
})
