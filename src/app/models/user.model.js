const db = require("../../database/db.js");
const { compare, hash } = require("bcrypt");
const { sign, verify } = require("../../utils/jwt");

const User = function (user) {
	this.username = user.username;
	this.password = user.password;
};
// SIGN UP
User.signup = async (newUser, result) => {
	let sql = `SELECT username FROM users WHERE username ="${newUser.username}"`;

	db.query(sql, async function (err, data) {
		if (data.length !== 0) {
			return result(err, { data: "User already exists" });
		} else {
			await db.query("INSERT INTO users SET ?", newUser, (err, data) => {
				if (err) {
					result(err, null);
					return;
				} else {
					return result(null, { data: "success" });
				}
			});
		}
	});
};
// SIGN IN
User.signin = async (username, password, result) => {
	let sql = `SELECT * FROM users WHERE username = "${username}"`;

	await db.query(sql, async (err, data) => {
		if (data.length == 0) {
			return result(null, { err: "User does not exist" });
		} else {
			let passwordChecking = await compare(password, data[0].password);
			if (passwordChecking == false) {
				return result(null, { err: "Wrong password" });
			}
			let user = {
				user_ID: data[0].user_ID,
				username: data[0].username,
				password: data[0].password,
				role_ID: data[0].role_ID,
			};
			let token = await sign(user);
			return result(null, {
				authentication: true,
				token: token,
				user: user,
			});
		}
	});
};

// GET ALL USERs
User.getList = async (result) => {
	let sql =
		"SELECT users.user_ID, users.username, users.role_ID, roles.rolename FROM users INNER JOIN roles WHERE roles.role_ID=users.role_ID";
	await db.query(sql, async (err, res) => {
		if (err) {
			result(err, null);
			return;
		} else {
			result(err, res);
		}
	});
};

// UPDATE USER
User.updateByID = async (user_ID, newUser, result) => {
	db.query(
		"UPDATE users SET password = ? WHERE username = ?",
		[newUser.password, newUser.username],
		(err, res) => {
			if (err) {
				result(err, null);
				return;
			}
			if (res.affectedRows == 0) {
				result({ result: "Nothing updated" }, null);
				return;
			}
			result(null, { ID: user_ID, res: res });
		}
	);
};

// UPDATE USER
User.updateByIDforRole = (user_ID, role_ID, result) => {
	db.query(
		"UPDATE users SET role_ID = ? WHERE user_ID = ?",
		[role_ID, user_ID],
		(err, res) => {
			if (err) {
				result(err, null);
				return;
			}
			if (res.affectedRows == 0) {
				result({ result: "Nothing updated" }, null);
				return;
			}
			result(null, res);
		}
	);
};
// DELETE USER
User.delete = (user_ID, result) => {
	db.query("DELETE FROM users WHERE user_ID = ?", [user_ID], (err, res) => {
		if (err) {
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			result({ result: "Nothing deleted" }, null);
			return;
		}
		result(null, res);
	});
};

// GET SPECIFIC USER
User.getUser = (user_ID, result) => {
	db.query("SELECT * FROM users WHERE user_ID = ?", [user_ID], (err, res) => {
		if (err) {
			result(null, err);
			return;
		}
		result(null, res);
	});
};
module.exports = User;
