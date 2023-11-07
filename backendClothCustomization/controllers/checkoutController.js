const db = require('../config/databaseConnection');
const client = require('../config/redisClient');
const path = require('path');
const fs = require('fs');

// Helper function to cache data in Redis
const cacheData = (key, data) => {
    client.setex(key, 3600, JSON.stringify(data));
};

const createOrder = async (req, res) => {
    try {
        const { name, phone, address, city, email, cart_ids } = req.body;
        const { userId } = req.user;
        const sql = `
        INSERT INTO orders (name, phone, address, city, email, cart_ids, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `
        console.log('Values:', [name, phone, address, city, email, cart_ids, userId]);
        await db.execute(sql, [name, phone, address, city, email, cart_ids, userId]);
        removeFromCart(cart_ids);
        res.status(200).json({ message: "Ordered Completed." })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
        console.log("Error while checking out", error)
    }
};

const getOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        const sql = `
            SELECT * FROM orders
            WHERE user_id = ?
        `;

        const [orders, fields] = await db.execute(sql, [userId]);

        // Create an array to store the products retrieved by their IDs
        const products = [];

        // Use a for loop instead of map to properly handle asynchronous operations
        for (const order of orders) {
            const cartIdArray = order.cart_ids.split(',');
            console.log(cartIdArray);

            for (const id of cartIdArray) {
                const product = await getProductById(id);
                products.push(product);
            }
        }
        // console.log(products)
        res.status(200).json({ orders, products });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log('Error while fetching orders', error);
    }
};

// Get a product by ID with Redis caching
const getProductById = async (productId) => {
    const key = `product:${productId}`;

    return new Promise((resolve, reject) => {
        // Check if the product data is already cached in Redis
        client.get(key, async (err, data) => {
            if (err) {
                console.error('Redis error:', err);
                reject(err);
            }

            if (data) {
                // If data is found in the cache, return it as a JSON response
                const product = JSON.parse(data);
                resolve(product);
            } else {
                // If data is not in the cache, retrieve it from the database
                const [productResult] = await db.execute(
                    'SELECT * FROM products WHERE id = ?',
                    [productId]
                );

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
                        const imageData = fs.readFileSync(imagePath)
                        return {
                            data: imageData.toString('base64'),
                        };
                    }),
                    color: colorsResult.map((row) => row.color),
                    sizes: sizesResult.map((row) => row.size),
                    fabric: fabricResult.map((row) => row.fabric),
                };
                // Cache the product data in Redis
                cacheData(key, product);

                // Resolve the Promise with the product data
                resolve(product);
            }

        });
    } );
};


const removeFromCart = async (cart_ids) => {
    const cartIdArray = cart_ids.split(',');
    console.log(cartIdArray, 'cartIdArray');

    // Map the array to an array of promises
    const updatePromises = cartIdArray.map(async (cartId) => {
        const sql = `
        UPDATE cart
        SET ordered = true
        WHERE  cart_id = ?
        `;
        return db.execute(sql, [cartId]);
    });

    // Wait for all promises to resolve
    await Promise.all(updatePromises);
};

module.exports = { createOrder, getOrder }