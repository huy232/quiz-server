const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.signin = async (req, res) => {
	let { username, password } = req.body;

	if (!username || !password) {
		res.status(400).send({ message: "No username or password" });
	}
	User.signin(username, password, (err, data) => {
		res.status(200).send(data);
	});
	if (!req.body) {
		res.status(400).send({
			message: "Please fill in the form!",
		});
	}
};
