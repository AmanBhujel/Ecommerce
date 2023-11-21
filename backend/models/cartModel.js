const db = require('../config/databaseConnection');

const createCartTable = async () => {
    try {
        db.execute(
            `CREATE TABLE cart (
                cart_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                product_id INT,
                quantity INT,
                ordered BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
            `
        )
        console.log('cartTable has been created.');
    } catch (error) {
        console.log(error);
    }
};

module.exports = createCartTable;