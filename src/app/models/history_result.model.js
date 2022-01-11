const db = require("../../database/db.js");

const HistoryResult = function (history_result) {
	this.question_ID = history_result.question_ID;
	this.answer_result = history_result.answer_result;
	this.answer_checkResult = history_result.answer_checkResult;
	this.history_ID = history_result.history_ID;
};

HistoryResult.create = async (newHistoryResult, result) => {
	await db.query(
		`SELECT result_ID FROM history_result WHERE question_ID = ? AND history_ID = ?`,
		[newHistoryResult.question_ID, newHistoryResult.history_ID],
		async (err, res) => {
			if (res[0]) {
				await db.query(
					`UPDATE history_result SET answer_result = ?, answer_checkResult = ? WHERE history_result.result_ID = ?`,
					[
						newHistoryResult.answer_result,
						newHistoryResult.answer_checkResult,
						res[0].result_ID,
					],
					(err, res) => {
						if (err) {
							return result(err, null);
						} else {
							return result(null, res);
						}
					}
				);
			} else {
				await db.query(
					`INSERT INTO history_result SET ?`,
					newHistoryResult,
					(err, res) => {
						if (err) {
							return result(err, null);
						} else {
							return result(null, res);
						}
					}
				);
			}
		}
	);
};

HistoryResult.getAll = async (user_ID, result) => {
	db.query(
		"SELECT * FROM history_result WHERE history_result.user_ID = ? AND history_result.user_ID = users.user_ID",
		[user_ID],
		(err, res) => {
			if (err) {
				result(null, result);
				return;
			}
			result(null, res);
		}
	);
};

HistoryResult.getSpecific = async (history_ID, user_ID, result) => {
	db.query(
		"SELECT DISTINCT history_result.*, questions.question_desc, answers.answer_desc, users.username, quizs.quizname FROM history_result LEFT JOIN questions ON (history_result.question_ID = questions.question_ID) LEFT JOIN answers ON (history_result.answer_result = answers.answer_ID) LEFT JOIN histories ON (histories.history_ID = history_result.history_ID) LEFT JOIN users ON (users.user_ID = histories.user_ID) LEFT JOIN quizs ON (quizs.quiz_ID = histories.quiz_ID) WHERE history_result.history_ID =? AND users.user_ID =? ORDER BY history_result.history_ID ASC ",
		[history_ID, user_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			}
			result(null, res);
		}
	);
};

HistoryResult.update = async (
	quesiton_ID,
	history_ID,
	newHistoryResult,
	result
) => {
	db.query(
		"UPDATE history_result SET answer_result = ?, answer_checkResult = ? WHERE question_ID = ?, history_ID = ?",
		[
			newHistoryResult.answer_result,
			newHistoryResult.answer_checkResult,
			quesiton_ID,
			history_ID,
		],
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

HistoryResult.getByHisID = async (history_ID, result) => {
	db.query(
		"SELECT history_result.*, questions.question_desc, answers.answer_desc, quizs.quizname FROM history_result LEFT JOIN questions ON (questions.question_ID = history_result.question_ID) LEFT JOIN answers ON (answers.answer_ID = history_result.answer_result) LEFT JOIN histories ON (histories.history_ID = history_result.history_ID) LEFT JOIN quizs ON (histories.quiz_ID = quizs.quiz_ID) WHERE history_result.history_ID =?",
		[history_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			}
			result(null, res);
		}
	);
};

HistoryResult.delete = async (history_ID, result) => {
	await db.query(
		`DELETE FROM history_result WHERE history_ID = ?`,
		[history_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			} else {
				db.query(
					`DELETE FROM histories WHERE history_ID = ?`,
					[history_ID],
					(err, res) => {
						if (err) {
							result(err, null);
							return;
						}
						return result(null, { res: "Success" });
					}
				);
			}
		}
	);
};

module.exports = HistoryResult;
