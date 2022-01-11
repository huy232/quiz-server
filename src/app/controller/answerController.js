const Answer = require("../models/answer.model.js");

exports.getAnswerList = async (req, res) => {
	Answer.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error when getting an answer list.",
			});
		res.status(200).send(data);
	});
};

exports.createAnswer = async (req, res) => {
	let { answer_desc, answer_result, question_ID } = req.body;
	let answer = new Answer({
		answer_desc: answer_desc,
		answer_result: answer_result,
		question_ID: question_ID,
	});
	Answer.create(answer, async (err, data) => {
		if (err) {
			await res.status(500).send({
				message: err.message || "Error when creating an answer",
			});
			return;
		}
		await res.status(200).send({ data });
	});
};

exports.updateAnswer = async (req, res) => {
	let { answer_ID } = req.params;
	let { answer_desc, answer_result, question_ID } = req.body;
	let answer = new Answer({
		answer_ID: answer_ID,
		answer_desc: answer_desc,
		answer_result: answer_result,
		question_ID: question_ID,
	});
	Answer.update(answer_ID, answer, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while updating an answer",
			});
		}
		res.status(200).send(data);
	});
};

exports.deleteAnswer = (req, res) => {
	let { answer_ID } = req.params;
	Answer.delete(answer_ID, async (err, data) => {
		if (err) {
			await res.status(500).send({
				message: "Error while deleting an answer",
			});
		}
		await res.send({ message: "Successfully delete an answer" });
	});
};

exports.countByQuestionID = async (req, res) => {
	let { question_ID } = req.body;
	Answer.countByQuestionID(question_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error while counting question",
			});
		}
		res.send(data);
	});
};

exports.findByQuestionID = async (req, res) => {
	let { question_ID } = req.params;
	Answer.findByQuestionID(question_ID, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error when getting a question list.",
			});
		res.status(200).send(data);
	});
};
