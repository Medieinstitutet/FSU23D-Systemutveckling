const DatabaseConnection = require("../database/DatabaseConnection");
const mongodb = require("mongodb");

class DatabaseObject {
    constructor() {
        this.collection = null;
        this.id = null;
    }

    setId(id) {
        this.id = id;
    }

    setObjectId(idString) {
        this.id = new mongodb.ObjectId(idString);
    }

    getSaveData() {
        console.warn("Overide getSaveData");
        return {};
    }

    save() {
        let data = this.getSaveData();
        DatabaseConnection.getInstance().save(this.collection, this.id, data);
    }
}

module.exports = DatabaseObject;