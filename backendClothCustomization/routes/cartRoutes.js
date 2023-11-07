const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, deleteFromCart, updateCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add-to-cart', verifyToken, addToCart);
router.get('/get-cart-items', verifyToken,getCartItems);
router.delete('/delete-cart-items', verifyToken,deleteFromCart);
router.put('/update-cart-item',verifyToken, updateCart);

module.exports = router;