const express = require('express');
const router = express.Router();
const { upload, } = require('../middleware/multerMiddleware');
const { createUserProfile, getUserProfile } = require('../controllers/userProfileController');
const verifyToken = require('../middleware/verifyToken');

router.put('/update-user', upload.single('image'), createUserProfile);
router.get('/getuser', verifyToken, getUserProfile);
module.exports = router;