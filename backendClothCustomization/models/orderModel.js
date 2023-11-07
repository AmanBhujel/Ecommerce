
const db = require('../config/databaseConnection');

// Create the order table if it does not exist
const createOrderModel = async () => {

    try {
        await db.execute(`
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            name VARCHAR(255),
            phone VARCHAR(20),
            address VARCHAR(255),
            city VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            cart_ids VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
    `);
        console.log('Order table created.');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createOrderModel };



