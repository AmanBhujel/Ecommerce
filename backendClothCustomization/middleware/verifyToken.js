// Middleware to verify JWT token and extract user info
const dotenv = require('dotenv');
const jwt=require('jsonwebtoken')
dotenv.config();
function verifyToken(req, res, next) {
    const {authorization} = req.headers;
    console.log(authorization)
    if (!authorization  || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized User.' });
    }

    const token = authorization.substring(7);

    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        console.log(user)
        next();
    });
};

module.exports = verifyToken;
