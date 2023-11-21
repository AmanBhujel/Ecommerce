const db = require('../../config/databaseConnection');

// app.get('/images/editHoodie.png', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'products', 'editHoodie.png'));
// });

//adding a product in database
const addProduct = async (req, res) => {
    try {
        const {
            name,
            stock,
            description,
            price,
            designable,
            features,
            images,
            colors,
            sizes,
            fabric,
        } = req.body;

        // Insert product data into the "products" table
        const [productResult] = await db.execute(
            'INSERT INTO products (name, stock, description, price, designable) VALUES (?, ?, ?, ?, ?)',
            [name, stock, description, price, designable]
        );

        const productId = productResult.insertId;

        // Insert features into the "features" table
        for (const feature of features) {
            await db.execute('INSERT INTO product_features (product_id,feature) VALUES (?,?)', [productId, feature]);
        }

        // Insert images into the "images" table
        for (const imageUrl of images) {
            await db.execute('INSERT INTO product_images (product_id, image_url) VALUES (?, ?)', [productId, imageUrl]);
        }

        // Insert colors into the "colors" table
        for (const color of colors) {
            await db.execute('INSERT INTO product_colors (product_id,color) VALUES (?,?)', [productId, color]);
        }

        // Insert sizes into the "sizes" table
        for (const size of sizes) {
            await db.execute('INSERT INTO product_sizes (product_id,size) VALUES (?,?)', [productId, size]);
        }

        // Insert fabric types into the "fabrics" table
        for (const fabricType of fabric) {
            await db.execute('INSERT INTO product_fabrics (product_id,fabric) VALUES (?,?)', [productId, fabricType]);
        }

        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//deleting a product from database
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if the product with the given ID exists
        const [productResult] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
        console.log('product result', productResult)
        // If the product doesn't exist, return a 404 error
        if (productResult.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product from the "products" table
        await db.execute('DELETE FROM products WHERE id = ?', [productId]);

        // Delete related data from other tables (features, images, colors, sizes, fabric)
        await db.execute('DELETE FROM product_features WHERE product_id = ?', [productId]);
        await db.execute('DELETE FROM product_images WHERE product_id = ?', [productId]);
        await db.execute('DELETE FROM product_colors WHERE product_id = ?', [productId]);
        await db.execute('DELETE FROM product_sizes WHERE product_id = ?', [productId]);
        await db.execute('DELETE FROM product_fabrics WHERE product_id = ?', [productId]);

        res.status(204).json({ message: "Deleted successfully." });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a product in the database
const updateProduct = async (req, res) => {
    try {
        const {
            id,
            name,
            stock,
            description,
            price,
            designable,
            features,
            images,
            colors,
            sizes,
            fabric,
        } = req.body;

        const [existingProduct] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);

        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Initialize an object to track changes
        const changes = {};

        // Check and update fields that have changed
        if (name !== existingProduct[0].name) {
            changes.name = name;
        }

        if (stock !== existingProduct[0].stock) {
            changes.stock = stock;
        }

        if (description !== existingProduct[0].description) {
            changes.description = description;
        }

        if (price !== existingProduct[0].price) {
            changes.price = price;
        }

        if (designable !== existingProduct[0].designable) {
            changes.designable = designable;
        }

        // Update product data in the "products" table if there are changes
        if (Object.keys(changes).length > 0) {
            const updateFields = Object.keys(changes).map(field => `${field} = ?`).join(', ');
            const updateValues = Object.values(changes);
            updateValues.push(id);

            await db.execute(`UPDATE products SET ${updateFields} WHERE id = ?`, updateValues);
        }

        // Update features
        if (features && features.length > 0) {
            await db.execute('DELETE FROM product_features WHERE product_id = ?', [id]);
            for (const feature of features) {
                await db.execute('INSERT INTO product_features (product_id, feature) VALUES (?, ?)', [id, feature]);
            }
        }

        // Update images
        if (images && images.length > 0) {
            await db.execute('DELETE FROM product_images WHERE product_id = ?', [id]);
            for (const imageUrl of images) {
                await db.execute('INSERT INTO product_images (product_id, image_url) VALUES (?, ?)', [id, imageUrl]);
            }
        }

        // Update colors
        if (colors && colors.length > 0) {
            await db.execute('DELETE FROM product_colors WHERE product_id = ?', [id]);
            for (const color of colors) {
                await db.execute('INSERT INTO product_colors (product_id, color) VALUES (?, ?)', [id, color]);
            }
        }

        // Update sizes
        if (sizes && sizes.length > 0) {
            await db.execute('DELETE FROM product_sizes WHERE product_id = ?', [id]);
            for (const size of sizes) {
                await db.execute('INSERT INTO product_sizes (product_id, size) VALUES (?, ?)', [id, size]);
            }
        }

        // Update fabrics
        if (fabric && fabric.length > 0) {
            await db.execute('DELETE FROM product_fabrics WHERE product_id = ?', [id]);
            for (const fabricType of fabric) {
                await db.execute('INSERT INTO product_fabrics (product_id, fabric) VALUES (?, ?)', [id, fabricType]);
            }
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addProduct, deleteProduct, updateProduct }