const Redis = require('ioredis');

const redisconn = () => {
	return new Redis();
}


module.exports = redisconn;
