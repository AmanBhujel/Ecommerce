const path = require('path');
const fs = require('fs');
const db = require('../config/databaseConnection');

//getting cart items with product name, price, and image
const getCartItems = async (req, res) => {
    try {
        const { userId } = req.user;

        const sql = `
            SELECT c.cart_id, c.user_id, c.product_id, c.quantity, 
                   p.name AS product_name, p.price AS product_price, 
                   pi.image_url AS product_image
            FROM cart c
            INNER JOIN products p ON c.product_id = p.id
            LEFT JOIN product_images pi ON p.id = pi.product_id
            WHERE c.user_id = ? AND c.ordered = false
        `;

        const [results] = await db.execute(sql, [userId]);
        const cartItems = await formatCartItems(results);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items  :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const formatCartItems = async (cartItemsResult) => {
    const cartItems = [];

    for (const cartItemRow of cartItemsResult) {
        const productId = cartItemRow.product_id;
        const quantity = cartItemRow.quantity;
        const cart_id = cartItemRow.cart_id;

        // Fetch product details including name and price
        const [productResult] = await db.execute(
            'SELECT name, price FROM products WHERE id = ?',
            [productId]
        );

        const product = productResult[0];

        // Fetch image URL from the product_images table
        const [imageResult] = await db.execute(
            'SELECT image_url FROM product_images WHERE product_id = ?',
            [productId]
        );

        if (imageResult.length > 0) {
            const imageUrl = imageResult[0].image_url;
            const imagePath = path.join('public', 'products', imageUrl);

            try {
                // Read the image file as binary data
                const imageData = fs.readFileSync(imagePath);
                const image_data = imageData.toString('base64');
                const cartItem = {
                    cart_id: cart_id,
                    product_id: productId,
                    product_name: product.name,
                    product_price: product.price,
                    product_image_data: image_data,
                    quantity,
                };

                cartItems.push(cartItem);
            } catch (error) {
                console.error('Error reading image:', error);
            }
        }


    }

    return cartItems;
};

// Function to update the quantity of a cart item
const updateCartItemQuantity = async (userId, productId, quantity) => {
    const sql = `
        UPDATE cart
        SET quantity = ?
        WHERE user_id = ? AND product_id = ?
    `;

    await db.execute(sql, [quantity, userId, productId]);
};

// Function to find a cart item
const findCartItem = async (userId, productId) => {
    const sql = `
        SELECT * FROM cart
        WHERE user_id = ? AND product_id = ? AND ordered=false
    `;

    const [results] = await db.execute(sql, [userId, productId]);

    if (results.length > 0) {
        return results[0]; // Return the first matching cart item
    } else {
        return null; // Return null if the cart item is not found
    }
};

//posting cart items
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const { userId } = req.user;

        // Check if the same product already exists in the user's cart
        const existingCartItem = await findCartItem(userId, productId);

        if (existingCartItem) {
            // If the same product exists, increase the quantity by 1
            const updatedQuantity = existingCartItem.quantity + 1;
            await updateCartItemQuantity(userId, productId, updatedQuantity);
            res.status(200).json({ message: 'Item added to cart successfully.' });
        } else {
            const sql = `
                INSERT INTO cart (user_id, product_id, quantity)
                VALUES (?, ?, ?)
            `;

            await db.execute(sql, [userId, productId, quantity]);
            res.status(201).json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error('Error adding item to carts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Deleting cart items
const deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.query;
        const { userId } = req.user;
        const sql = `
            DELETE FROM cart
            WHERE user_id = ? AND product_id=?
        `;

        await db.execute(sql, [userId, productId]);
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//updating cart items
const updateCart = async (req, res) => {
    try {
        const { quantity, productId } = req.body;
        const { userId } = req.user;

        const sql = `
            UPDATE cart
            SET quantity = ?
            WHERE user_id = ? AND product_id = ?
        `;
        await db.execute(sql, [quantity, userId, productId]);

        res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addToCart,
    deleteFromCart,
    getCartItems,
    updateCart
};
