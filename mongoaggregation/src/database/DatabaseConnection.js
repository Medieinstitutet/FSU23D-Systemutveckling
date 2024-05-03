const mongodb = require("mongodb");

let instance = null;

class DatabaseConnection {
    constructor() {
        this.url = null;
    }

    setUrl(url) {
        this.url = url;
    }

    async connect() {
        if(this.client) {
            return;
        }
        this.client = new mongodb.MongoClient(this.url);

        await this.client.connect();
    }

    async saveOrder(lineItems, customer) {

        await this.connect();

        let db = this.client.db("shop");
        let collection = db.collection("orders");

        let result = await collection.insertOne({"customer": customer, "orderDate": new Date(), "status": "unpaid", "totalPrice": 0, "paymentId": null}); //METODO: calculate total price

        let orderId = result.insertedId;
        let encodedLineItems = lineItems.map((lineItem) => {
            return {
                "amount": lineItem["amount"],
                "totalPrice": 0 /* METODO: calculate */,
                "order": new mongodb.ObjectId(orderId),
                "product": new mongodb.ObjectId(lineItem["product"]),
            }
        })
        
        let lineItemsCollection = db.collection("lineItems");
        await lineItemsCollection.insertMany(encodedLineItems)

        return result.insertedId;
    }

    async createProduct() {
        await this.connect();

        let db = this.client.db("shop");
        let collection = db.collection("products");

        let result = await collection.insertOne({"status": "draft", "name": null, "description": null, "image": null, "amountInStock": 0, "price": 0, "category": null});

        return result.insertedId;
    }

    async updateProduct(id, request) {

        await this.connect();

        let db = this.client.db("shop");
        let collection = db.collection("products");

        let productData = request.productData;

        let saveData = {
          "name": productData["name"],
          "description": productData["description"]["text"],
          "amountInStock": productData["amountInStock"],
          "price": productData["price"],
          "category": productData["category"] ? new mongodb.ObjectId(productData["category"]) : null
        };

        let filter = {"_id": new mongodb.ObjectId(id)};
        let setOperation = {"$set": saveData};

        console.log(filter, setOperation);

        await collection.updateOne(filter, setOperation);
    }

    async save(aCollection, aId, aData) {
      await this.connect();

      let db = this.client.db("shop");
      let collection = db.collection(aCollection);

      await collection.updateOne({"_id": aId}, {"$set": aData});
    }

    async getProducts() {
        await this.connect();

        let db = this.client.db("shop");
        let collection = db.collection("products");

        let pipeline = [
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $addFields: {
                category: {
                  $first: "$category",
                },
              },
            },
          ];

        let documents = collection.aggregate(pipeline);
        let returnArray = [];

        for await(let document of documents) {
            returnArray.push(document);
        }

        return returnArray;
    }

    async getAllOrders() {
        await this.connect();

        let db = this.client.db("shop");
        let collection = db.collection("orders");

        let pipeline = [
            {
              $lookup: {
                from: "lineItems",
                localField: "_id",
                foreignField: "order",
                as: "lineItems",
                pipeline: [
                  {
                    $lookup: {
                      from: "products",
                      localField: "product",
                      foreignField: "_id",
                      as: "product",
                    },
                  },
                  {
                    $addFields: {
                      product: {
                        $first: "$product",
                      },
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
              },
            },
            {
              $addFields: {
                linkedCustmer: {
                  $first: "$customer",
                },
              },
            },
          ];

        let documents = collection.aggregate(pipeline);
        let returnArray = [];

        for await(let document of documents) {
            returnArray.push(document);
        }

        return returnArray;
    }

    async getActiveProducts() {
        await this.connect();

        let db = this.client.db("shop");
        let collection = db.collection("products");

        let products = await collection.find({"status": "active"}).toArray();

        return products;
    }

    async setOrderAsPayed(id) {
        await this.connect();

        let db = this.client.db("shop");
        let collection = db.collection("orders");

        await collection.updateOne({"_id": new mongodb.ObjectId(id)}, {$set : {"status": "payed"}});
    }

    async testRead() {
        await this.connect();
        let db = this.client.db("shop");

        let collection = db.collection("orders");

        {
          let filter = {};
          let results = await collection.find(filter).toArray(); //Listar alla ordrar
        }

        {
          let idString = "661fe5af6ed8411a34bddaa6";
          let filter = {"_id": new mongodb.ObjectId(idString)};
          let results = await collection.find(filter).toArray(); //Listar 1 order med id:t
          let order = (results.length > 0) ? results[0] : null;
        }

        {
          let collection = db.collection("customers");
          let idString = "mattias@example.com";
          let filter = {"_id": idString};
          let results = await collection.find(filter).toArray(); //Listar 1 customer med id:t
          let customer = results[0];
        }

        //collection = db.collection("orders");

        {
          let filter = {"customer": "mattias@example.com"};
          let results = await collection.find(filter).toArray(); //Listar alla ordrar för en customer
        }

        {
          let filter = {"customer": "mattias@example.com", "status": "unpaid"};
          let results = await collection.find(filter).toArray(); //Listar alla ordrar för en customer med status unpaid
        }
        
        {
          let filter = {"orderDate": {$gt: new Date("2024-01-01")}};
          let results = await collection.find(filter).toArray(); //Listar alla ordrar som kom in efter 1:a januari 2024
        }

        {
          let pipeline = [];
          let aggregate = collection.aggregate(pipeline);
          let results = [];
          for await(let document of aggregate) {
            results.push(document);
          }
          //Listar alla ordrar
        }

        {
          let pipeline = [
            {
              $project: {
                customer: 0,
              },
            },
          ]
          let aggregate = collection.aggregate(pipeline);
          let results = [];
          for await(let document of aggregate) {
            results.push(document);
          }
          //Listar alla ordrar utan customer länk
        }
    }

    async testWrite() {
        await this.connect();
        let db = this.client.db("shop");

        let collection = db.collection("orders");

        {
          let result = await collection.insertOne({"status": "unpaid"});
          result.insertedId;
          //Lägg till order med autogenererat id
        }

        {
          let result = await collection.insertOne({"_id": new mongodb.ObjectId(), "status": "unpaid"});
          result.insertedId;
          //Lägg till order med autogenererat id
        }

        {
          let collection = db.collection("customers");
          let result = await collection.insertOne({"_id": "mattias2@example.com", "firstName": "M"});
          result.insertedId;
          //Lägg till customer med eget id
        }

        {
          let idString = "661fe5af6ed8411a34bddaa6";
          let result = await collection.insertOne({"_id": new mongodb.ObjectId(idString), "status": "unpaid"});
          result.insertedId;
          //Lägg till order med eget object id
        }

        {
          let results = await collection.insertMany([{"status": "unpaid"}, {"status": "unpaid"}]);
          results.insertedIds;
          //Lägg till 2 ordrar med auto id
        }

        {
          let idString = "661fe5af6ed8411a34bddaa6";
          let filter = {"_id": new mongodb.ObjectId(idString)};
          await collection.updateOne(filter, {$set: {"status": "paid"}});
          //Sätter status för ordern med id
        }

        {
          let idString = "661fe5af6ed8411a34bddaa6";
          let filter = {"_id": new mongodb.ObjectId(idString)};
          await collection.updateOne(filter, {$set: {"status": "paid", "paymentId": "chg_123123123...."}});
          //Sätter 2 fält för ordern med id
        }

        {
          await collection.updateMany({}, {$set: {"version": "1"}});
          //Sätter version: 1 på alla ordrar
        }
    }

    static getInstance() {
        if(instance === null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}

module.exports = DatabaseConnection;