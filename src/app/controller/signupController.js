const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { hash, compare } = require("bcrypt");

exports.signup = async (req, res) => {
	let { username, password } = req.body;
	if (!req.body) {
		res.status(400).send({
			message: "Please fill in the form!",
		});
	}
	let hashPassword = await hash(password, 8);
	let user = new User({
		username: username,
		password: hashPassword,
	});
	User.signup(user, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while signing up",
			});
		} else res.status(200).send({ data });
	});
};
