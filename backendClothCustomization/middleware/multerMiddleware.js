const multer = require('multer');
const path = require('path');
const db=require('../config/databaseConnection')

// Set up Multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/userProfiles');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });



module.exports = {
  upload,
};
