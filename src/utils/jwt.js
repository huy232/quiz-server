const jwt = require("jsonwebtoken");

const privatekey = "secret";

function sign(obj) {
	return new Promise((resolve, reject) => {
		jwt.sign(obj, privatekey, (err, token) => {
			if (err) return reject(err);
			return resolve(token);
		});
	});
}

function verify(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, privatekey, (err, decode) => {
			if (err) return reject(err);
			return resolve(decode);
		});
	});
}

module.exports = { sign, verify };
