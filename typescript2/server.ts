import express, { Request, Response } from 'express';
import QueryString from 'qs';
import dotenv from 'dotenv';
import routes from './routes';
import * as routesConfig from './routes';

// Configure dotenv
dotenv.config();

type test = {
    name: string
    id: bigint
}

let app = express();

if(typeof(process.env.DATABASE_URL) === "string") {
    let url:string = process.env.DATABASE_URL as string;

    let connectToDatabase = (url:string):void => {
        console.log("connectToDatabase");
        console.log("url", url);

    }
    
    connectToDatabase(url);
    routesConfig.config(url);
}

interface Subscription {
    userId: number
    status: string
}

interface Article {
    id: number
    title: string
    body: string
}

function getApiData<T>(url:string):T {

    //fetch
    //result:any
    //return result as T

    if(url === "http://example.com") {
        return {"userId": 1, status: "active"} as T;
    }
    return {"id": 1, title: "", "body": ""} as T;
}

let result = getApiData<Subscription>("http://example.com");

result.userId;

let resultArticle = getApiData<Article>("http://example.com/1");

resultArticle.body;


app.get("/", (req, res) => {
    res.send("Success");
    req.body.email
});

app.listen(3000, () => {
    console.log("Started");
})