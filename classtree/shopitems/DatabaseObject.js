let DatabaseObject = class {
    constructor(id) {
        super();

        this.id = id;
        this.schema = null;
    }

    loadFromDatabase() {
        return this.schema.findById(this.id);
    }
}

module.exports = DatabaseObject;