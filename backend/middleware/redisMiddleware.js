const client = require('../config/redisClient');

// Middleware to check if data is in Redis cache
const checkCache = (req, res, next) => {
    const { id } = req.params;
    const key = `product:${id}`;

    // Check if data is in Redis cache
    client.get(key, (err, data) => {
        if (err) {
            console.error('Redis error:', err);
            next(); 
        } else if (data) {
            res.status(200).json(JSON.parse(data));
        } else {
            next();
        }
    });
};

module.exports = checkCache;