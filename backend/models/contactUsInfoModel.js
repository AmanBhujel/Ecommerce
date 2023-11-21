const db = require('../config/databaseConnection');

const createContactUsTable = async () => {
    try {
        await db.execute(`
        CREATE TABLE IF NOT EXISTS contact_us (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            phone VARCHAR(20),
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Contact-Us table created.');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createContactUsTable };

