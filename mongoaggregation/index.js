let DatabaseConnection = require("./src/database/DatabaseConnection");
let Api = require("./src/api/Api");

DatabaseConnection.getInstance().setUrl('mongodb://localhost:27017');

let api = (new Api()).start();