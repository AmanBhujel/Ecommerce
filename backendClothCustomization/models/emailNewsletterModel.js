const db = require('../config/databaseConnection');

// Create the users table if it does not exist
const createEmailNewsletterModel = async () => {
    try {
        await db.execute(`
        CREATE TABLE IF NOT EXISTS emailNewsletter (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log('Email Newsltter table created.');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createEmailNewsletterModel };


