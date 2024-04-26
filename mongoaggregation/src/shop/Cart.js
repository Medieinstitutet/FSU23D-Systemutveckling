const ContainLineItems = require("./ContainLineItems");
const Order = require("./Order");

class Cart extends ContainLineItems {
    constructor() {
        super();

        this.collection = "carts";
    }

    async createOrder() {
        let order = new Order();

        for(let i = 0; i <this.lineItems.length; i++) {
            let lineItem = this.lineItems[i];
            await order.createLineItem(lineItem.productId, lineItem.amount);
        }

        await order.calculateTotalPrice();
        await order.save();

        return order;
    }

    getSaveData() {
        let data = {};

        if(this.totalPrice) {
            data["totalPrice"] = this.totalPrice;
        }
        
        return data;
    }
}

module.exports = Cart;