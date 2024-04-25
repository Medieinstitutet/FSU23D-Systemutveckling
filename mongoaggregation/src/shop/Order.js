const DatabaseObject = require("./DatabaseObject");

class Order extends DatabaseObject {
    constructor() {
        super();

        this.collection = "orders";
    }

    setOrderDateToNow() {
        this._orderDate = new Date();

        return this;
    }

    getSaveData() {
        let data = {};

        if(this._orderDate) {
            data["orderDate"] = this._orderDate;
        }
        
        return data;
    }
}

module.exports = Order;