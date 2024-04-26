const ContainLineItems = require("./ContainLineItems");

class Order extends ContainLineItems {
    constructor() {
        super();

        this.collection = "orders";
    }

    getSaveData() {
        let data = {};

        if(this._orderDate) {
            data["orderDate"] = this._orderDate;
        }
        if(this._customer) {
            data["customer"] = this._customer;
        }
        if(this._status) {
            data["status"] = this._status;
        }
        if(this.totalPrice) {
            data["totalPrice"] = this.totalPrice;
        }
        //METODO: add more fields, totalPrice, paymentId...
        
        return data;
    }
}

module.exports = Order;