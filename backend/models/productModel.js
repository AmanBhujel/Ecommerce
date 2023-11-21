const db = require('../config/databaseConnection');

const createProductTables = async () => {
    try {
        // Create the Products Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                stock INT,
                description TEXT,
                price DECIMAL(10, 2),
                designable BOOLEAN
            );
        `);

        // Create the Product-Features Relationship Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS product_features (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT,
                feature VARCHAR(255),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        `);

        // Create the Product-Images Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS product_images (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT,
                image_url VARCHAR(255),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        `);

        // Create the Product-Colors Relationship Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS product_colors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT,
                color VARCHAR(255),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        `);

        // Create the Product-Sizes Relationship Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS product_sizes (  
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT ,
                size VARCHAR(255),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        `);

        // Create the Product-Fabrics Relationship Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS product_fabrics (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT,
                fabric VARCHAR(255),
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        `);

        console.log('Product-related tables and relationships have been created or already exist.');
    } catch (error) {
        console.log('Error creating product-related tables:', error);
    }
};

module.exports = { createProductTables };
