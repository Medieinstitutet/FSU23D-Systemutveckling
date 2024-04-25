const FileUploadEndpoint = require("./FileUploadEndpoint");
const CreateOrderEndpoint = require("./CreateOrderEndpoint");
const express = require("express");

class Api {
    constructor() {

        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded());

        this.port = 3000;
        this.started = false;

        {
            let currentEndpoint = new FileUploadEndpoint();
            currentEndpoint.folderPath = "product-images/";
            currentEndpoint.requireRole = "admin";
            this.registerEndpoint("post", "/product-image", currentEndpoint);
        }
        
        {
            let currentEndpoint = new FileUploadEndpoint();
            currentEndpoint.folderPath = "user-profile/";
            this.registerEndpoint("post", "/me/profile", currentEndpoint);
        }

        {
            let currentEndpoint = new CreateOrderEndpoint();
            this.registerEndpoint("post", "/create-order", currentEndpoint);
        }
    }

    getUserForRequest(aRequest) {
        //METODO:

        return null;
    }

    registerEndpoint(aMethod, aPath, aEndpoint) {

        switch(aMethod) {
            default:
                console.warn("Unknown method " + aMethod);
            case "options2":
            case "get2":
                if(aMethod === "options2") {
                    console.warn("Dangaerous method " + aMethod + ". Read more here: url");
                }
                else if(aMethod === "get2") {
                    console.warn("Dangaerous method " + aMethod + ". Read more here: url");
                }
            case "post":
            case "get":
            case "put":
            case "patch":
            case "options":
                this.app[aMethod](aPath, async (request, response) => {
                    let user = this.getUserForRequest(request);
                    if(await aEndpoint.userCanPerform(user)) {
                        //METODO: send all data
                        let result = await aEndpoint.perform(request.body);
                        response.json(result);
                    }
                    else {
                        response.status(401);
                        response.send("User not allowed");
                    }
                });
                break;
            
        }

        
    }

    setPort(aPort) {
        if(!this.started) {
            this.port = aPort;
        }
        else {
            console.warn("Already started");
        }

        return this;
    }

    start() {
        if(!this.started) {
            this.app.listen(this.port);
            this.started = true;
        }
        
        return this;
    }
}

module.exports = Api;