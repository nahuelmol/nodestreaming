const crypto = require('crypto')

function encrypter() {
	
	const hash = crypto.createHash('sha256')
	hash.update(data);
	const hashed_data = hash.digest('hex')
	return hashed_data;

}

module.exports = encrypter;
