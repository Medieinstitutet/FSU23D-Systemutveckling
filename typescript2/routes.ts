let routes = {

}

export default routes;

let config = (url:string):void => {

}

export { config };

let close = ():void => {

}

export { close };


function multiply(x:number, y:number):number;
function multiply(x:string, y:string):string;
function multiply(x:any, y:any):any {
    if(typeof(x) === "number" && typeof(y) === "number") {
        return x*y;
    }
    else if(typeof(x) === "string" && typeof(y) === "string") {
        return x + " x " + y;
    }
    return null;
}

let result = multiply(2, 3);
let textResult = multiply("2 fiskar", "20 kr");

type User = {
    id: number
    email: string
}

function getUser(id:number):User;
function getUser(email:string):User;
function getUser(user:User):User;
function getUser(identifier:any):User {
    if(typeof(identifier) === "number") {
        //API fetch by id
        //result
        //return result as User
        return {"id": identifier, "email": "test@example.com"} as User;
    }
    else if(typeof(identifier) === "string") {
        //API fetch by email
        //result
        //return result as User
        return {"id": 123, "email": identifier} as User;
    }
    else {
        return identifier as User;
    }
}

export {getUser};


