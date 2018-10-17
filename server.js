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
        var db = client.db(databaseName);
        catalogue = db.collection(collection);
        let closeClient = () => {
            client.close();
        }
        callback(catalogue, options, res, client, closeClient);
    })
}
const userExists = (catalogue, user, res, client, closeClient) => {
    let email = user.email;
    catalogue.find({ email: email }).toArray((err, docs) => {
        if (docs.length < 1) {
            catalogue.insertOne(user, (err, response) => {
                if (err) {
                    client.close();
                    return;
                } else {
                }
                res.header("Access-Control-Allow-Origin", '*')
                res
                    .send(response)
                    .end();
            }, closeClient)
        }
        let id = docs[0]["_id"];
        userId = id;
        res.send(docs)
        res.end()
    })
}

const getPriceRange = (catalogue, options, res, client, closeClient) => {
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
    let list = [];
    if (options.category != 'all' && options.myMin != undefined) {
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
            list.push(doc);
        })
        cursor.once('end', function () {
            res.send(list)
            res.end()
            closeClient
        })
    }
    else if (options.category == 'all' && options.myMin != undefined) {
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
            list.push(doc);
        })
        cursor.once('end', function () {
            res.send(list)
            res.end()
            closeClient
        })
    } else if (options.category != 'all' && options.myMin == undefined) {
        let cursor = catalogue.aggregate([{
            $match: {
                category: options.category,
            }
        }]);
        cursor.on('data', function (doc) {
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
            client.close();
            return;
        } else {
        }
        res
            .send(docs)
            .end();
    }, closeClient)*/
}

const buyFunction = (catalogue, cart, res, client, closeClient) => {
  let newArray = cart.map(item => {
    return ObjectId(item.id)
  })
  let query = {_id: {$in: newArray}};
  catalogue.find(query).toArray((err, doc) => {
  })
  catalogue.deleteMany(query, (err, result) => {
    if (err) {
      throw err
    }
    res.send(result)
  }, closeClient)
}

server.post('/api/buy', jsonParser, (req, res) => {
  let cart = JSON.parse(req.body);
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

    catalogue.updateOne(detail, setDocument, (err, result) => {
        res.set({
            "Access-Control-Allow-Origin": '*'
        })
        res.send(result)
        res.end()
    }, () => { client.close() })
}

const searchFunc = (catalogue, searchWord, res, client, closeClient) => {
    let returnList = null;
    let db = client.db(databaseName)
    //console.log('Connected to mongo database.')
    catalogue.find().toArray((err, result) => {
        returnList = result;
        if (returnList !== null) {
             console.log("no result from search");
        }
        res.header("Access-Control-Allow-Origin", '*')
        res.send(returnList)
        res.end()
    }, closeClient)
}

const getInitialProps = (catalogue, filter, res, client, closeClient) => {
    let returnList = null;
    let db = client.db(databaseName)
    catalogue.find().toArray((err, result) => {
        /*result.forEach((item) => {
          returnList.push(item)
        })*/
        returnList = result;
        if (returnList !== null) {
            //console.log(returnList[0])
        }
        res.header("Access-Control-Allow-Origin", '*')
        res.send(returnList)
        res.end()
    }, closeClient)
}

const findUserProducts = (catalogue, filter, res, client, closeClient) => {
  let returnList = null;
  catalogue.find({email: filter}).toArray((err, result) => {
    returnList = result;
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

server.post('/api/search', jsonParser, (req,res) => {
    //let searchText = JSON.stringify(req.body);
    connectToMongo('false', {}, searchFunc, res, productCollection);
    /*
    MongoClient.connect(urlLoggedIn, { useNewUrlParser: true }, (err, client) => {
        let db = client.db(databaseName)
        let catalogue = db.collection(productCollection)
        let products = [];
        if (err) {
            client.close();
        }


        //generateData(10, catalogue)
        //catalogue.insertMany(mockList)
        client.close()
    })*/
    //connectToMongo('false', req.body, searchFunction, res, productCollection);
    //res.header("Access-Control-Allow-Origin", '*');
    //res.send({ success: true });
    //res.end();
});

server.post('/api/signUp/:isLoggedIn', jsonParser, (req, res) => {
    let isLoggedIn = req.params.isLoggedIn;
    let user = JSON.parse(req.body);
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
