const DatabaseObject = require("./DatabaseObject");
const LineItem = require("./LineItem");

class ContainLineItems extends DatabaseObject {
    constructor() {
        super();

        this._lineItems = [];
    }

    getLineItems() {
        return this._lineItems;
    }

    get lineItems() {
        return this._lineItems;
    }

    addLineItem(aLineItem) {
        this._lineItems.push(aLineItem);
    }

    async createLineItem(productId, amount) {

        await this.ensureHasId();

        let lineItem = new LineItem();

        lineItem.setOrder(this.id);
        lineItem.setProduct(productId);
        lineItem.setAmount(amount);
        await lineItem.calculateTotalPrice();

        await lineItem.save();

        this.addLineItem(lineItem);
    }

    async calculateTotalPrice() {
        //Load line line items
        let total = this._lineItems.reduce((total, lineItem, index) => {
            return total+lineItem.totalPrice;
        }, 0);

        this.totalPrice = total;
    }
}

module.exports = ContainLineItems;