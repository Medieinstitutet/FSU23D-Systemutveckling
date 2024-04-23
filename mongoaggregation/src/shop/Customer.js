const User = require("./User")

class Customer extends User { 
    constructor(aFirstName, aLastName, aBirthDay) {
        super(aFirstName, aLastName, aBirthDay);
    }

    getOrders() {
        return [
            {"id": 1, "date": "..."},
            {"id": 2, "date": "..."},
            {"id": 3, "date": "..."}
        ]
    }
}

module.exports = Customer;