const db = require("../../database/db.js");

const Question = function (question) {
	this.question_ID = question.question_ID;
	this.question_desc = question.question_desc;
	this.quiz_ID = question.quiz_ID;
};
// CREATE QUESTION
Question.create = async (newQuestion, result) => {
	let sql = `SELECT question_desc FROM questions WHERE question_desc = "${newQuestion.question_desc}"`;

	await db.query(sql, async (err, data) => {
		if (data.length !== 0) {
			return result(null, { error: "There is an error" });
		} else {
			await db.query(
				`INSERT INTO questions SET ?`,
				newQuestion,
				(err, data) => {
					if (err) {
						result(err, null);
						return;
					} else {
						return result(null, { data: "Success" });
					}
				}
			);
		}
	});
};
// GET ALL QUESTION
Question.getAll = (result) => {
	db.query("SELECT * FROM questions", (err, res) => {
		if (err) {
			result(null, err);
			return;
		}
		result(null, res);
	});
};

Question.getQuestionByID = (question_ID, result) => {
	db.query(
		"SELECT * FROM questions WHERE question_ID = ?",
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

// GET ALL QUESTION BASED ON QUIZ ID
Question.getQuestionListByQuizID = (quiz_ID, result) => {
	db.query(
		"SELECT * FROM questions WHERE quiz_ID = ?",
		[quiz_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			}
			result(null, res);
		}
	);
};

Question.getQuesAnsListByQuizID = (quiz_ID, result) => {
	db.query(
		"SELECT q.*, a.* FROM questions q INNER JOIN answers a ON q.question_ID = a.question_ID WHERE quiz_ID = ?",
		[quiz_ID],
		(err, res) => {
			if (err) {
				result(null, err);
				return;
			}
			result(null, res);
		}
	);
};

// UPDATE QUESTION
Question.updateQuestion = (question_ID, newQuestion, result) => {
	db.query(
		"UPDATE questions SET question_desc = ? WHERE question_ID = ?",
		[newQuestion.question_desc, question_ID],
		(err, res) => {
			if (err) {
				result(err, null);
				return;
			}
			if (res.affectedRows == 0) {
				result({ result: "Nothing updated" }, null);
				return;
			}
			result(null, { ID: question_ID, res });
		}
	);
};
// DELETE QUESTION
Question.delete = async (question_ID, result) => {
	await db.query(
		"DELETE FROM questions WHERE question_ID = ?",
		[question_ID],
		async (err, res) => {
			if (err) {
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				result({ result: "Nothing deleted" }, null);
				return;
			}
			await result(null, res);
		}
	);
};

// COUNT QUESTION BASE ON QUIZ ID AND UPDATE TO TOTAL QUESTION NUMBER BASED ON QUIZ ID
Question.countByQuizID = (quiz_ID, result) => {
	let sql = `UPDATE quizs SET quiz_total_question = (SELECT COUNT (*) FROM questions WHERE questions.quiz_ID = ?) WHERE quizs.quiz_ID=?`;
	db.query(sql, [quiz_ID, quiz_ID], (err, res) => {
		if (err) {
			result(null, err);
			return;
		}
		result(null, res);
	});
};

module.exports = Question;
