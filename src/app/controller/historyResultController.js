const HistoryResult = require("../models/history_result.model");

exports.createHistoryResult = async (req, res) => {
	let { history_ID } = req.params;
	let { question_ID, answer_result, answer_checkResult } = req.body;
	let historyResult = new HistoryResult({
		question_ID: question_ID,
		answer_result: answer_result,
		answer_checkResult: answer_checkResult,
		history_ID: history_ID,
	});
	HistoryResult.create(historyResult, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while creating result",
			});
		}
		res.send(data);
	});
};

exports.getAll = async (req, res) => {
	HistoryResult.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error when getting history result",
			});
		res.send(data);
	});
};

exports.getSpecific = async (req, res) => {
	let { history_ID, user_ID } = req.params;
	HistoryResult.getSpecific(history_ID, user_ID, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error when getting history result",
			});
		res.send(data);
	});
};

exports.update = async (req, res) => {
	let { question_ID, history_ID } = req.params;
	let { answer_result, answer_checkResult } = req.body;
	let historyResult = new HistoryResult({
		answer_result: answer_result,
		answer_checkResult: answer_checkResult,
	});
	HistoryResult.update(question_ID, history_ID, historyResult, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while updating a history result",
			});
			return;
		}
		res.status(200).send(data);
	});
};

exports.getHistoryResult = async (req, res) => {
	let { history_ID } = req.params;
	HistoryResult.getByHisID(history_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while getting history result",
			});
		}
		res.send(data);
	});
};

exports.delete = async (req, res) => {
	let { history_ID } = req.params;
	HistoryResult.delete(history_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: "Error while while deleting a history",
			});
		}
		res.send({ message: "Successfully delete a history", data });
	});
};
