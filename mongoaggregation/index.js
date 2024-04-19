console.log("index.js");

let express = require("express");
let DatabaseConnection = require("./src/database/DatabaseConnection");

let url = 'mongodb://localhost:27017';

DatabaseConnection.getInstance().setUrl(url);


let app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (request, response) => {
    
    let orders = await DatabaseConnection.getInstance().getAllOrders();
    response.json(orders);

    }
);

app.get("/products", async (request, response) => {

//METODO: connect to database
    response.json([{"id": 1, "name": "Product 1"}, {"id": 2, "name": "Product 2"}]);

    }
);

app.post("/create-order", async (request, response) => {
    
    let customer = await DatabaseConnection.getInstance().getOrCreateCustomer(request.body.email, request.body.name,  request.body.address);
    let order = await DatabaseConnection.getInstance().createOrder(request.lineItems, customer);
    
    response.json(order);

    }
);

app.listen(3000);