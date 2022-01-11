const db = require("../../database/db.js");

const Quiz = function (quiz) {
	(this.quiz_ID = quiz.quiz_ID),
		(this.quizname = quiz.quizname),
		(this.quiztime = quiz.quiztime);
};
// CREATE QUIZ
Quiz.create = async (newQuiz, result) => {
	let sql = `SELECT quizname, quiztime FROM quizs WHERE quizname = "${newQuiz.quizname}" AND quiztime = "${newQuiz.quiztime}"`;

	await db.query(sql, async (err, data) => {
		// console.log(sql)
		// console.log(data)
		if (data.length !== 0) {
			return result(null, { error: "There is an error" });
		} else {
			await db.query(`INSERT INTO quizs SET ?`, newQuiz, (err, data) => {
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
// GET ALL QUIZ
Quiz.getAll = (result) => {
	db.query("SELECT * FROM quizs", (err, res) => {
		if (err) {
			result(null, err);
			return;
		}
		result(null, res);
	});
};

// FIND QUIZ
Quiz.getByID = (quiz_ID, result) => {
	db.query(`SELECT * FROM quizs WHERE quiz_ID = ?`, [quiz_ID], (err, res) => {
		if (err) {
			result(null, err);
			return;
		}

		if (res.length) {
			result(null, res[0]);
			return;
		}
		result({ kind: "No quiz were found" }, null);
	});
};

// UPDATE BY ID
Quiz.updateByID = (quiz_ID, newQuiz, result) => {
	db.query(
		"UPDATE quizs SET quizname = ?, quiztime = ? WHERE quiz_ID = ?",
		[newQuiz.quizname, newQuiz.quiztime, quiz_ID],
		(err, res) => {
			if (err) {
				result(err, null);
				return;
			}
			if (res.affectedRows == 0) {
				result({ result: "Nothing updated" }, null);
				return;
			}
			result(null, { ID: quiz_ID, res: res });
		}
	);
};
// DELETE QUIZ
Quiz.delete = (quiz_ID, result) => {
	db.query("DELETE FROM quizs WHERE quiz_ID = ?", [quiz_ID], (err, res) => {
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

module.exports = Quiz;
