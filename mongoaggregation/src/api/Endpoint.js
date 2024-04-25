class Endpoint {
    constructor() {
        
    }

    async userCanPerform(aUser) {
        return true;
    }

    async perform(aData) {
        //MENOTE: should be overridden
        return null;
    }
}

module.exports = Endpoint;