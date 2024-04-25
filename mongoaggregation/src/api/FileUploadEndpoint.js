const Endpoint = require("./Endpoint");

class FileUploadEndpoint extends Endpoint {
    constructor() {
        super();

        this.folderPath = "user-uploads/";
        this.requireRole = null;
    }

    async userCanPerform(aUser) {
        if(this.requireRole) {
            if(aUser && aUser.hasRole(this.requireRole)) {
                return true;
            }
            return false;
        }
        return true;
    }

    async perform(aData) {
        //METODO

        /*
            Get image from aData
            Move image to this.folderPath + filename
        */
    }
}

module.exports = FileUploadEndpoint;