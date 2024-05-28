// Importing module
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT:Number=3000;



// Handling GET / Request
app.get('/', async(req, res) => {
    res.send('Welcome to typescript backend!');

    let db = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: 'root',
        password: 'notSecureChangeMe',
        database: 'test'
    });

    const [results, fields] = await db.query(
        'SELECT * FROM `pages`'
      );

    console.log(results, fields);
})

// Server setup
app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})