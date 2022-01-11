const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const bcrypt = require("bcrypt");
const { hash, compare } = require("bcrypt");

// USER SECTION
exports.getUserList = async (req, res) => {
	User.getList((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error while getting user list",
			});
		res.send(data);
	});
};

exports.updateUser = async (req, res) => {
	let { user_ID, username, password } = req.body;
	let hashPassword = await hash(password, 8);
	const user = new User({
		user_ID: user_ID,
		username: username,
		password: hashPassword,
	});

	User.updateByID(user_ID, user, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while updating an user",
			});
		}
		res.send(data) || "Successfully update an user";
	});
};

exports.updateUserByRole = async (req, res) => {
	let { user_ID } = req.params;
	let { role_ID } = req.body;

	User.updateByIDforRole(user_ID, role_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while updating an user",
			});
		}
		res.send(data);
	});
};

exports.deleteUser = async (req, res) => {
	let { user_ID } = req.params;
	User.delete(user_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error while deleting an user",
			});
		}
		res.send({ message: "Successfully to delete an user" });
	});
};

exports.getUser = async (req, res) => {
	let { user_ID } = req.params;
	User.getUser(user_ID, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error while getting user",
			});
		res.send(data);
	});
};

// ROLE SECTION

exports.getRoleList = async (req, res) => {
	Role.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error when getting role list.",
			});
		res.send(data);
	});
};

exports.findRole = async (req, res) => {
	let { role_ID, rolename } = req.body;
	Role.findByID(role_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while finding a role",
			});
			return;
		}
		res.status(200).send(data);
	});
};

exports.createRole = async (req, res) => {
	let { rolename } = req.body;
	let role = new Role({
		rolename: rolename,
	});
	Role.create(role, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while creating a role",
			});
		} else res.send(data);
	});
};

exports.updateRole = async (req, res) => {
	let { role_ID } = req.params;
	let { rolename } = req.body;
	let role = new Role({
		rolename: rolename,
	});
	Role.updateByID(role_ID, role, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while updating a role",
			});
		}
		res.send(data);
	});
};

exports.deleteRole = async (req, res) => {
	let { role_ID } = req.params;
	Role.delete(role_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error while while deleting a role",
			});
			return;
		}
		res.status(200).send({ message: "Successfully delete a role" });
	});
};
