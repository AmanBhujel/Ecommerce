

const { Redis } = require('ioredis');
const { REDIS_URL } = process.env;
const client = new Redis(REDIS_URL);

module.exports = client;
