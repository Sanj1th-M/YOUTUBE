const { createClient } = require('redis');
const config = require('../config');
const logger = require('../utils/logger');

const client = createClient({
  url: config.redis.url,
});

client.on('error', (err) => logger.error('Redis Client Error', err));
client.on('connect', () => logger.info('Connected to Redis'));

const connectRedis = async () => {
  // Non-blocking connection attempt for demo stability
  client.connect().catch(err => {
    logger.error('Initial Redis connection failed', err);
  });
};

module.exports = {
  client,
  connectRedis,
};
