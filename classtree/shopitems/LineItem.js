const DatabaseObject = require("DatabaseObject");
const LineItemSchema = require('../models/lineItem');

let LineItem = class extends DatabaseObject {
    constructor(id) {
        super(id);

        this.schema = LineItemSchema;
    }

    getAmount() {
        return this.getData()["amount"];
    }
}

module.exports = LineItem;