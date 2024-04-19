const DatabaseObject = require("DatabaseObject");


let ContainLineItems = class extends DatabaseObject {
    constructor(id) {
        super(id);

        this.lineItems = []
    }

    loadFromDatabase() {
        let lineItemsData = super.loadFromDatabase()["lineItems"]

        for(let lineItemData in lineItemsData) {
            this.lineItems.push(new LineItem());
        }
    }

    addLineItem() {
//METODO
    }

    removeLineItem() {
//METODO
    }
}

module.exports = ContainLineItems;