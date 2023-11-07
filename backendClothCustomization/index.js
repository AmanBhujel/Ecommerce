const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/databaseConnection');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoute');
const userProfileRoutes = require('./routes/userProfileRoutes');
const cartRoutes = require('./routes/cartRoutes')
const emailRoutes = require('./routes/emailLetterRoutes');
const contactRoutes = require('./routes/contactUsRoutes');
const orderRoutes = require('./routes/checkoutRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // For form data
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 5000 ;

app.use('/', authRoutes, productRoutes, userProfileRoutes, cartRoutes, emailRoutes, contactRoutes, orderRoutes);

// -------just run this once to create table at the beginning--------------
// const { createOrderModel } = require('./models/orderModel');
// createOrderModel();
// const {createEmailNewsletterModel}=require('./models/emailNewsletterModel');
// createEmailNewsletterModel();

// const { createProductTables } = require('./models/productModel');
// const { createUsersTable } = require('./models/userModel')
// createUsersTable();
// createProductTables();
// const createFabricObjectTable = require('./models/fabricObjects');
// createFabricObjectTable();
// const  createCartTable  = require('./models/cartModel');
// createCartTable();
// const {createContactUsTable}=require('./models/contactUsInfoModel')
// createContactUsTable();


//starting server
app.listen(PORT, () => {
    try {
        console.log('Server is running on port', PORT);
    } catch (error) {
        console.error('Error in the server callback:', error.message);
    }
});