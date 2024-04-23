class User {
    constructor(aFirstName, aLastName, aBirthDay) {
        this.firstName = aFirstName;
        this.lastName = aLastName;
        this.birthDay = aBirthDay;
    }

    getName() {
        return this.firstName + " " + this.lastName;
    }

    canEditProducts() {
        return false;
    }

    getAge() {
        return (new Date() - new Date(this.birthDay))/(1000*60*60*24*365);
    }

    isOlderThan(aUser) {
        return this.getAge() > aUser.getAge();
    }
}

module.exports = User;