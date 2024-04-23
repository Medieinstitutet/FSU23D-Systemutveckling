const DatabaseObject = require("./DatabaseObject");

class Product extends DatabaseObject {
    constructor() {
        super();

        this.collection = "products";
    }

    setName(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    getSaveData() {
        let data = {"name": this._name, "description": ""};
        
        return data;
    }
}

module.exports = Product;