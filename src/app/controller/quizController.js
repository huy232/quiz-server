const Quiz = require("../models/quiz.model.js");

exports.getQuizList = async (req, res) => {
	Quiz.getAll((err, data) => {
		if (err)
			return res.status(500).send({
				message: err.message || "Error when getting quiz list.",
			});
		res.send(data);
	});
};

exports.getQuiz = async (req, res) => {
	let { quiz_ID } = req.params;
	Quiz.getByID(quiz_ID, (err, data) => {
		// console.log(req.params)
		if (err) {
			return res.status(500).send({
				message: err.message || "Error while getting a quiz",
			});
		}
		res.send(data);
	});
};

exports.createQuiz = async (req, res) => {
	let { quizname, quiztime } = req.body;
	let quiz = new Quiz({
		quizname: quizname,
		quiztime: quiztime,
	});
	Quiz.create(quiz, (err, data) => {
		if (err) {
			return res.status(500).send({
				message: err.message || "Error while creating a quiz",
			});
		}
		res.send(data);
	});
};

exports.updateQuiz = async (req, res) => {
	let { quiz_ID } = req.params;
	let { quizname, quiztime } = req.body;
	let quiz = new Quiz({
		quizname: quizname,
		quiztime: quiztime,
	});
	Quiz.updateByID(quiz_ID, quiz, (err, data) => {
		if (err) {
			return res.status(500).send({
				message: err.message || "Error while updating a quiz",
			});
		}
		res.send(data);
	});
};

exports.deleteQuiz = async (req, res) => {
	let { quiz_ID } = req.params;
	Quiz.delete(quiz_ID, (err, data) => {
		if (err) {
			return res.status(500).send({
				message: "Error while deleting a quiz",
			});
		}
		res.send({ message: "Successfully delete a quiz" });
	});
};
