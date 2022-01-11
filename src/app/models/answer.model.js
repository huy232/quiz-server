const db = require("../../database/db.js");

const Answer = function (answer) {
	this.answer_ID = answer.answer_ID;
	this.answer_desc = answer.answer_desc;
	this.answer_result = answer.answer_result;
	this.question_ID = answer.question_ID;
};
// CREATE ANSWER
Answer.create = async (newAnswer, result) => {
	let sql = `SELECT answer_desc FROM answers WHERE answer_desc = "${newAnswer.answer_desc}" AND question_ID = "${newAnswer.question_ID}"`;

	await db.query(sql, async (err, data) => {
		if (data.length !== 0) {
			return result(null, { error: "There is an error" });
		} else {
			await db.query(`INSERT INTO answers SET ?`, newAnswer, (err, data) => {
				if (err) {
					result(err, null);
					return;
				} else {
					return result(null, { data: "Success" });
				}
			});
		}
	});
};
// GET ALL ANSWER
Answer.getAll = (result) => {
	db.query("SELECT * FROM answers", (err, res) => {
		if (err) {
			result(null, err);
			return;
		}
		result(null, res);
	});
};

// UPDATE ANSWER
Answer.update = (answer_ID, newAnswer, result) => {
	db.query(
		"UPDATE answers SET answer_desc = ?, answer_result = ? WHERE answer_ID = ?",
		[newAnswer.answer_desc, newAnswer.answer_result, answer_ID],
		(err, res) => {
			if (err) {
				result(err, null);
				return;
			}
			if (res.affectedRows == 0) {
				result({ result: "Nothing updated" }, null);
				return;
			}
			result(null, { ID: answer_ID, res: res });
		}
	);
};
// DELETE ANSWER
Answer.delete = (answer_ID, result) => {
	db.query("DELETE FROM answers WHERE answer_ID = ?", answer_ID, (err, res) => {
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

// COUNT QUESTION BASE ON QUIZ ID AND UPDATE TO TOTAL QUESTION NUMBER BASED ON QUIZ ID
Answer.countByQuestionID = (question_ID, result) => {
	let sql = `UPDATE questions SET question_count_correct = (SELECT COUNT (*) FROM answers WHERE answers.question_ID = ? AND answers.answer_result = 1) WHERE questions.question_ID=?`;
	db.query(sql, [question_ID, question_ID], (err, res) => {
		if (err) {
			result(null, err);
			return;
		}
		result(null, res);
	});
};

Answer.findByQuestionID = (question_ID, result) => {
	db.query(
		"SELECT * FROM answers WHERE question_ID = ?",
		[question_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			}
			result(null, res);
		}
	);
};

module.exports = Answer;
