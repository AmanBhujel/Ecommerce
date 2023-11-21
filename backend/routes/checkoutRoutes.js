const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const { createOrder, getOrder } = require('../controllers/checkoutController');

router.post('/order', verifyToken, createOrder);
router.get('/get-order', verifyToken, getOrder);
module.exports = router;