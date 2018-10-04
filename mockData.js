module.exports = {
    generateData: (times) => {

        const MongoClient = require('mongodb').MongoClient;
        //const url = 'mongodb://127.0.0.1:27017';
        const databaseName = 'databaseName';
        const collectionName = 'collectionName';
        const mongolab = client.db(databaseName);

        const db = client.db(databaseName);
        const catalogue = db.collection(collectionName);

        let myArray = [];

        const n = ['Trimmer', 'Hair Dryer', 'Fridge', 'Oven', 'Smart tv', 'High Tech PC',
            'Posh Sunglasses', 'Scummy Second Hand Car'];
        const p = [100, 25, 57, 64, 89, 500]
        const c = ['Home Appliances', 'Electronics', 'Furniture']

        function randomElement(list) {
            let r = Math.random() * list.length;
            return list[Math.floor(r)];
        }

        function createObject(newList) {
            let newObject = {};
            newObject.name = randomElement(n);
            newObject.price = randomElement(p);
            newObject.category = randomElement(c);
            newList.push(newObject);
        }

        for (i = 0; i < times; i++) {
            createObject(myArray);
        }

        catalogue.inserMany(myArray);
    }
}