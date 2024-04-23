const User = require("./User")

class Administrator extends User { 
    constructor(aFirstName, aLastName, aBirthDay) {
        super(aFirstName, aLastName, aBirthDay);
    }

    getName() {
        return super.getName() + " (admin)";
    }

    canEditProducts() {
        return true;
    }
}

module.exports = Administrator;