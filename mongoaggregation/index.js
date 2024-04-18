console.log("index.js");

let mongodb = require("mongodb");
let express = require("express");

let app = express();

app.get("/", (request, response) => {
    
    let url = 'mongodb://localhost:27017';
    let client = new mongodb.MongoClient(url);

    client.connect().then(async () => {
        console.log("connected");

        let db = client.db('shop');
        let collection = db.collection('orders');

        let pipeline = [
            {
            $lookup: {
                from: "lineItems",
                localField: "order",
                foreignField: "id",
                as: "lineItems",
                pipeline: [
                {
                    $lookup: {
                    from: "products",
                    localField: "id",
                    foreignField: "product",
                    as: "linkedProduct",
                    },
                },
                {
                    $addFields: {
                    linkedProduct: {
                        $first: "$linkedProduct",
                    },
                    },
                },
                ],
            },
            },
            {
            $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                from: "customers",
                localField: "id",
                foreignField: "customer",
                as: "linkedCustomer",
                },
            },
            {
            $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                linkedCustomer: {
                    $first: "$linkedCustomer",
                },
                calculatedTotal: {
                    $sum: "$lineItems.totalPrice",
                },
                },
            },
        ]

        let aggregate = collection.aggregate(pipeline);

        let orders = [];

        for await (let document of aggregate) {
            orders.push(document);
        }

        return orders;

        

    }).then((orders) => {

        response.json(orders);
    }
).finally(() => {
        client.close();
    })
});

app.listen(3000);