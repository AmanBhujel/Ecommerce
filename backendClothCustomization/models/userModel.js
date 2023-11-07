
const db = require('../config/databaseConnection');

// Create the users table if it does not exist
const createUsersTable = async () => {
    // try {
    //     await db.execute(`
    //         CREATE TABLE IF NOT EXISTS users (
    //             id INT AUTO_INCREMENT PRIMARY KEY,
    //             name VARCHAR(255) NOT NULL,
    //             email VARCHAR(255) NOT NULL,
    //             password VARCHAR(255) NOT NULL,
    //             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //         )
    //     `);

    //     console.log('Users table already exists or has been created.');
    // } catch (error) {
    //     console.log('Error creating users table:', error);
    // }
    try {
        await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            name VARCHAR(255),
            phone VARCHAR(20),
            address VARCHAR(255),
            image BLOB,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `);
        console.log('User table created.');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createUsersTable };



