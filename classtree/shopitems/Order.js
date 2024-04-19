const ContainLineItems = require("ContainLineItems");
const Order = require('../models/order');

let Order = class extends ContainLineItems {
    constructor(id) {
        super(id);

        this.schema = Order;
    }

    getTotal() {
        return this.getData()["totalPrice"];
    }

    setStatus(status) {
        //METODO
    }
}

module.exports = Order;