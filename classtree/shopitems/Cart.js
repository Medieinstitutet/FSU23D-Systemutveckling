const ContainLineItems = require("ContainLineItems");
const CartSchema = require('../models/CartSchema');

let Cart = class extends ContainLineItems {
    constructor(id) {
        super(id);

        this.schema = CartSchema;
    }

    createOrder() {
        let order = new Order();
        order.setToday();

        for(let lineItem  in this.lineItems) {
            order.addLineItem(lineItem);
        }

        order.setCustomer(this.customer) //METODO: get customer
        return order;
    }
}

module.exports = Cart;