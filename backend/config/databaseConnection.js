
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Creating a Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

try {
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
        } else {
            console.log('Connected to the database!');
            connection.release(); // Release the connection when done
        }
    });
} catch (error) {
    console.error('Error in database connection:', error.message);
}

module.exports = db.promise();
