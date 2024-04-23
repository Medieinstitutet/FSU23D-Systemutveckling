const DatabaseConnection = require("./src/database/DatabaseConnection");
const Product = require("./src/shop/Product");

let url = 'mongodb://localhost:27017';
DatabaseConnection.getInstance().setUrl(url);




let product = new Product();
product.setObjectId("6622709303160a457b2e4d1b");

product.setName("...");
//product.setDescription("...");
//product.setPrice(100);
//product.increaseStock(20);

product.save();

/*
let orders = product.getOrdersIncludingThisProduct();
let income = orders.reduce((previous, current, index, order) => {
    return current + order.getTotalPrice();
}, 0);
*/
