const DatabaseObject = require("DatabaseObject");
const Product = require('../models/product');

let Product = class extends DatabaseObject {
    constructor(id) {
        super(id);

        this.schema = Product;
    }

    getPrice() {
        return this.getData()["price"];
    }

    getFormattedPrice() {
        let price = this.getPrice();

        price =Math.round(price*100)/100;

        switch(getPackedSettings.getCurrency()) {
            case "USD":
                price 
        }

        return price;
    }
}

module.exports = Product;