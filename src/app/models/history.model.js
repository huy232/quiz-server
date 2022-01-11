const db = require("../../database/db.js");

const History = function (history) {
	this.history_ID = history.history_ID;
	this.user_ID = history.user_ID;
	this.quiz_ID = history.quiz_ID;
};

History.create = async (newHistory, result) => {
	await db.query(
		`INSERT INTO histories SET user_ID = ?, quiz_ID = ?`,
		[newHistory.user_ID, newHistory.quiz_ID],
		(err, data) => {
			if (err) {
				result(err, null);
				return;
			} else {
				return result(null, { data: "Success" });
			}
		}
	);
};

History.get = async (user_ID, result) => {
	db.query(
		"SELECT * FROM histories WHERE user_ID =? ORDER BY history_ID DESC LIMIT 1 ",
		[user_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			}
			result(null, res);
		}
	);
};

History.getAllHis = async (user_ID, result) => {
	db.query(
		"SELECT histories.*, quizs.quizname FROM histories INNER JOIN quizs ON (histories.quiz_ID = quizs.quiz_ID) WHERE user_ID =? ORDER BY history_ID DESC LIMIT 20",
		[user_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			}
			result(null, res);
		}
	);
};

module.exports = History;
