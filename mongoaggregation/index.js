console.log("index.js");

let express = require("express");
let DatabaseConnection = require("./src/database/DatabaseConnection");

let url = 'mongodb://localhost:27017';

DatabaseConnection.getInstance().setUrl(url);


let app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/orders", async (request, response) => {
    
    let orders = await DatabaseConnection.getInstance().getAllOrders();
    response.json(orders);

    }
);

app.get("/products", async (request, response) => {

    let products = await DatabaseConnection.getInstance().getProducts();

    response.json(products);

    }
);

app.post("/create-order", async (request, response) => {
    
    //METODO: create customer
    let orderId = await DatabaseConnection.getInstance().saveOrder(request.body.lineItems, request.body.email)

    response.json({"id": orderId});

});

app.post("/products", async (request, response) => {
    
    let id = await DatabaseConnection.getInstance().createProduct();
    await DatabaseConnection.getInstance().updateProduct(id, request.body);

    response.json({"id": id});

});

app.post("/products/:id", async (request, response) => {
    
    await DatabaseConnection.getInstance().updateProduct(request.params.id, request.body);

    response.json({"id": request.params.id});

});

app.get("/active-products", async (request, response) => {
    let products = await DatabaseConnection.getInstance().getActiveProducts();

    response.json(products);
});

app.post("/complete-order/:id", async (request, response) => {
    
    //METODO: check that payment is done
    let isPayed = true; //MEDEBUG: always true
    if(isPayed) {
        await DatabaseConnection.getInstance().setOrderAsPayed(request.params.id);
    }

    response.json({"payed": isPayed});
})

app.listen(3000);