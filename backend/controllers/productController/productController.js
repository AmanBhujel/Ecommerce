const path = require('path');
const db = require('../../config/databaseConnection');
const client = require('../../config/redisClient');
const fs = require('fs');
// Helper function to cache data in Redis
const cacheData = (key, data) => {
    client.setex(key, 3600, JSON.stringify(data));
};

// Get a product by ID with Redis caching
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const key = `product:${productId}`; // Create a unique cache key for this product

        // Check if the product data is already cached in Redis
        client.get(key, async (err, data) => {
            if (err) {
                console.error('Redis error:', err);
            }

            if (data) {
                // If data is found in the cache, return it as a JSON response
                const product = JSON.parse(data);
                res.status(200).json(product);
            } else {
                // If data is not in the cache, retrieve it from the database
                const [productResult] = await db.execute(
                    'SELECT * FROM products WHERE id = ?',
                    [productId]
                );

                if (productResult.length === 0) {
                    return res.status(404).json({ error: 'Product not found' });
                }

                const [featuresResult] = await db.execute(
                    'SELECT feature FROM product_features WHERE product_id = ?',
                    [productId]
                );

                const [imagesResult] = await db.execute(
                    'SELECT image_url FROM product_images WHERE product_id = ?',
                    [productId]
                );
                const [colorsResult] = await db.execute(
                    'SELECT color FROM product_colors WHERE product_id = ?',
                    [productId]
                );
                const [sizesResult] = await db.execute(
                    'SELECT size FROM product_sizes WHERE product_id = ?',
                    [productId]
                );
                const [fabricResult] = await db.execute(
                    'SELECT fabric FROM product_fabrics WHERE product_id = ?',
                    [productId]
                );

                // Construct the product object with all the details
                const product = {
                    ...productResult[0],
                    features: featuresResult.map((row) => row.feature),
                    images: imagesResult.map((row) => {
                        // Fetch image data for each URL
                        const imageUrl = row.image_url;
                        const imagePath = path.join('public', 'products', imageUrl);

                        // Read the image file as binary data
                        const imageData = fs.readFileSync(imagePath);

                        return {
                            data: imageData.toString('base64'),
                        };
                    }),
                    color: colorsResult.map((row) => row.color),
                    sizes: sizesResult.map((row) => row.size),
                    fabric: fabricResult.map((row) => row.fabric),
                };

                cacheData(key, product);
                console.log('running')
                res.status(200).json(product);

            }
        });
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all products with Redis caching
const getAllProducts = async (req, res) => {
    try {
        const key = 'allProducts';
        client.get(key, async (err, data) => {
            if (err) {
                console.error('Redis error:', err);
                const [productsResult] = await db.execute('SELECT * FROM products');
                if (productsResult.length === 0) {
                    return res.status(404).json({ error: 'No products found' });
                }
                const products = await formatProducts(productsResult);
                cacheData(key, products);
                res.status(200).json(products);
            } else if (data) {
                res.status(200).json(JSON.parse(data));
            } else {
                const [productsResult] = await db.execute('SELECT * FROM products');
                if (productsResult.length === 0) {
                    return res.status(404).json({ error: 'No products found' });
                }
                const products = await formatProducts(productsResult);
                cacheData(key, products);
                res.status(200).json(products);
            }
        }
        );
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Helper function to format products
const formatProducts = async (productsResult) => {
    const products = [];
    for (const productRow of productsResult) {
        const productId = productRow.id;
        const [featuresResult] = await db.execute(
            'SELECT feature FROM product_features WHERE product_id = ?',
            [productId]
        );
        const [imagesResult] = await db.execute(
            'SELECT image_url FROM product_images WHERE product_id = ?',
            [productId]
        );
        const productImages = imagesResult.map((row) => {
            const imageUrl = row.image_url;
            const imagePath = path.join('public', 'products', imageUrl); // Ensure correct path
            try {
                // Read the image file as binary data
                const imageData = fs.readFileSync(imagePath);
                return {
                    data: imageData.toString('base64'),
                };
            } catch (error) {
                console.error('Error reading image:', error);
                return { error: 'Image not found' }; // Handle errors
            }
        });
        const [colorsResult] = await db.execute(
            'SELECT color FROM product_colors WHERE product_id = ?',
            [productId]
        );
        const [sizesResult] = await db.execute(
            'SELECT size FROM product_sizes WHERE product_id = ?',
            [productId]
        );
        const [fabricResult] = await db.execute(
            'SELECT fabric FROM product_fabrics WHERE product_id = ?',
            [productId]
        );

        const product = {
            ...productRow,
            features: featuresResult.map((row) => row.feature),
            images:
                productImages,
            colors: colorsResult.map((row) => row.color),
            sizes: sizesResult.map((row) => row.size),
            fabric: fabricResult.map((row) => row.fabric),
        };

        products.push(product);
    }
    return products;
};

module.exports = { getProductById, getAllProducts };
