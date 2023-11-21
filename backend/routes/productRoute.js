const express = require('express');
const router = express.Router();
const db = require('../config/databaseConnection');
const {getProductById,getAllProducts}= require('../controllers/productController/productController');
const {addProduct,deleteProduct, updateProduct}=require('../controllers/productController/adminProductController');
const checkCache=require('../middleware/redisMiddleware');

// Get products
router.get('/products/:id',checkCache,getProductById);
router.get('/products',getAllProducts);

//admin functions for product
router.post('/add-product',addProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products', updateProduct);


module.exports = router;
