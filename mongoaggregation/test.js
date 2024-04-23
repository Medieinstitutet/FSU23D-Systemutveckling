console.log("test.js");
const User = require("./src/shop/User");
const Administrator = require("./src/shop/Administrator");
const Customer = require("./src/shop/Customer");

let user1 = new Administrator("M", "E", "2000-01-01");
console.log(user1.getName());

let user2 = new Customer("A", "B", "1997-02-01");
console.log(user2.getName());
