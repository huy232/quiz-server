const db = require("../../database/db.js");

const Role = function (role) {
	this.rolename = role.rolename;
};
// CREATE ROLE
Role.create = async (newRole, result) => {
	let sql = `SELECT rolename FROM roles WHERE rolename = "${newRole.rolename}"`;

	await db.query(sql, async (err, data) => {
		if (data.length !== 0) {
			return result(null, { error: "Empty array" });
		} else {
			await db.query(`INSERT INTO roles SET ?`, newRole, (err, data) => {
				if (err) {
					result(err, null);
					return;
				}
				return result(null, { data: "Success" });
			});
		}
	});
};
// GET ALL ROLE
Role.getAll = (result) => {
	db.query("SELECT * FROM roles", (err, res) => {
		if (err) {
			result(null, err);
			return;
		}
		result(null, res);
	});
};

// FIND ROLE
Role.findByID = (role_ID, result) => {
	db.query(`SELECT * FROM roles WHERE role_ID = ?`, [role_ID], (err, res) => {
		if (err) {
			result(null, err);
			return;
		}

		if (res.length) {
			result(null, res[0]);
			return;
		}
		result({ kind: "No role were found" }, null);
	});
};

// UPDATE BY ID
Role.updateByID = (role_ID, newRole, result) => {
	db.query(
		"UPDATE roles SET rolename = ? WHERE role_ID = ?",
		[newRole.rolename, role_ID],
		(err, res) => {
			if (err) {
				result(err, null);
				return;
			}
			if (res.affectedRows == 0) {
				result({ result: "Nothing updated" }, null);
				return;
			}
			result(null, { ID: role_ID, res: res });
		}
	);
};
// DELETE ROLE
Role.delete = (role_ID, result) => {
	db.query("DELETE FROM roles WHERE role_ID = ?", [role_ID], (err, res) => {
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

module.exports = Role;
