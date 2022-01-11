const Question = require("../models/question.model.js");

exports.getQuestionList = async (req, res) => {
	Question.getAll((err, data) => {
		if (err)
			return res.status(500).send({
				message: err.message || "Error when getting a question list.",
			});
		res.send(data);
	});
};

exports.getQuestionByID = async (req, res) => {
	let { question_ID } = req.params;
	Question.getQuestionByID(question_ID, (err, data) => {
		if (err)
			return res.status(500).send({
				message: err.message || "Error when getting a question list.",
			});
		res.send(data);
	});
};

exports.getQuestionListByQuizID = async (req, res) => {
	let { quiz_ID } = req.params;
	Question.getQuestionListByQuizID(quiz_ID, (err, data) => {
		if (err)
			return res.status(500).send({
				message: err.message || "Error when getting a question list.",
			});
		res.send(data);
	});
};

exports.getQuesAnsListByQuizID = async (req, res) => {
	let { quiz_ID } = req.params;
	Question.getQuesAnsListByQuizID(quiz_ID, (err, data) => {
		if (err)
			return res.status(500).send({
				message: err.message || "Error when getting a question list.",
			});
		res.send(data);
	});
};

exports.createQuestion = async (req, res) => {
	let { question_desc, quiz_ID } = req.body;
	let question = new Question({
		question_desc: question_desc,
		quiz_ID: quiz_ID,
	});
	Question.create(question, (err, data) => {
		if (err) {
			return res.status(500).send({
				message: err.message || "Error while creating a question",
			});
		}
		res.send({ data });
	});
};

exports.updateQuestion = async (req, res) => {
	let { question_ID } = req.params;
	let { question_desc } = req.body;
	let question = new Question({
		question_desc: question_desc,
	});
	Question.updateQuestion(question_ID, question, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while updating a question",
			});
		}
		res.status(200).send(data);
	});
};

exports.deleteQuestion = async (req, res) => {
	let { question_ID } = req.params;
	Question.delete(question_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error while deleting a question",
			});
		}
		res.status(200).send({ message: "Successfully delete a question" });
	});
};

exports.countByQuizID = async (req, res) => {
	let { quiz_ID } = req.body;
	Question.countByQuizID(quiz_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error while counting question",
			});
		}
		res.send(data);
	});
};
