const redisconn = require('./conn.js');


const SetNameFile = async (key, value) => {

	const redis = redisconn();

	redis.set(key, value);

	redis.quit();

}

const GetNameFile = async (key) => {

	const redis = redisconn();

	var res = redis.get(key)
		.then((result) => {

  			if(result == null){
  				return false;
  			}
  			
  			return true;
			})
		.catch(err => {
			
			console.log(err);
		});

	redis.quit();

	return res;
}

module.exports = {
	SetNameFile,
	GetNameFile,
}
