const Endpoint = require("./Endpoint");
const Order = require("../shop/Order");

class CreateOrderEndpoint extends Endpoint {
    constructor() {
        super();
    }

    async perform(aData) {
        let order = new Order();

        order.setOrderDateToNow();
        await order.addCustomerData(aData["customer"]); //METODO: create
        await order.createLineItems(aData["lineItems"]); //METODO: create

        await order.save();

        return {"id": order.id};
    }
}

module.exports = CreateOrderEndpoint;