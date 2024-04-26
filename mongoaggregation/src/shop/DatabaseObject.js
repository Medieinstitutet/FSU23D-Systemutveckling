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

    async save() {
        console.log("DatabaseObject::save");
        let data = this.getSaveData();
        this.id = await DatabaseConnection.getInstance().save(this.collection, this.id, data);
    }

    async ensureHasId() {
        if(!this.id) {
            this.id = await DatabaseConnection.getInstance().save(this.collection, this.id, {});
        }
    }

    async getDatabaseData() {
        return await DatabaseConnection.getInstance().getDocument(this.collection, this.id);
    }

    getObjectId(id) {
        if(!id) {
            return null;
        }
        if(id instanceof mongodb.ObjectId) {
            return id;
        }
        return new mongodb.ObjectId(id);
    }
}

module.exports = DatabaseObject;