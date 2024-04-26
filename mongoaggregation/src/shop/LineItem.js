const DatabaseObject = require("./DatabaseObject");
const Product = require("./Product");

class LineItem extends DatabaseObject {

    constructor() {
        super();

        this.collection = "lineItems";
    }

    setOrder(id) {
        this.orderId = this.getObjectId(id);
    }

    setProduct(idString) {
        this.productId = this.getObjectId(idString);
    }

    setAmount(amount) {
        this.amount = amount;
    }

    async calculateTotalPrice() {
        let product = new Product();
        product.setId(this.productId);
        await product.setupFromDatabase(); //METODO: implement function

        let productPrice = product.getPrice(); //METODO: implement function
        this.totalPrice = this.amount*productPrice;
    }

    getSaveData() {
        let data = {};

        if(this.orderId) {
            data["order"] = this.orderId;
        }
        if(this.productId) {
            data["product"] = this.productId;
        }
        if(this.amount) {
            data["amount"] = this.amount;
        }
        if(this.totalPrice) {
            data["totalPrice"] = this.totalPrice;
        }
        
        return data;
    }
}

module.exports = LineItem;