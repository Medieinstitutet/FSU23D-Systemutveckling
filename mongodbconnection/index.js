console.log("index.js");

let mongodb = require("mongodb");

let url = 'mongodb://localhost:27017';
let client = new mongodb.MongoClient(url);

client.connect().then(() => {
    console.log("connected");

    let db = client.db('test');
    let collection = db.collection('test');

    return collection.insertMany([{a: 1}, {a: 2}, {a: 3, name: "Test product", price: 123}]).then(() => {
        console.log("inserted");

        return collection.find({name: "Test product"}).toArray().then((results) => {
            console.log("Found", results);
        })
    });

}).finally(() => {
    client.close();
})