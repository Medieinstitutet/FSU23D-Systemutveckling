const DatabaseConnection = require("./src/database/DatabaseConnection");
const Order = require("./src/shop/Order");
const Cart = require("./src/shop/Cart");

let url = 'mongodb://localhost:27017';
DatabaseConnection.getInstance().setUrl(url);






let main = async () => {
    /*
    let order = new Order();
    
    await order.createLineItem("6622709303160a457b2e4d1b", 3);
    await order.createLineItem("661e6f29d9dba07d8ba9aeb5", 2);

    order.calculateTotalPrice();

    await order.save();
    */

    let cart = new Cart();
    
    await cart.createLineItem("6622709303160a457b2e4d1b", 3);
    await cart.createLineItem("661e6f29d9dba07d8ba9aeb5", 2);

    cart.calculateTotalPrice();

    await cart.save();

    let order = await cart.createOrder();
}

main();