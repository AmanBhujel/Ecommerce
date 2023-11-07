const express=require('express');
const router=express.Router();
const verifyToken = require('../middleware/verifyToken');
const {signUp,login} = require('../controllers/authController');

// Signup route
router.post('/signup',signUp);

// Login route
router.post('/login', login);

// CHeck authorization
router.get('/check-auth', verifyToken, (req, res) => {
    if (req.user) {
      res.json({ authorized: true });
    } else {
      res.json({ authorized: false });
    }
  });
  

module.exports = router;
