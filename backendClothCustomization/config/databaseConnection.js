const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

//Creating a Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABSE
});

module.exports = db.promise();
