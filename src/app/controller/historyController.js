const History = require("../models/history.model");

exports.createHistory = async (req, res) => {
	let { user_ID, quiz_ID } = req.body;
	let history = new History({
		user_ID: user_ID,
		quiz_ID: quiz_ID,
	});
	History.create(history, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while creating result",
			});
			return;
		}
		res.status(200).send(data);
	});
};

exports.getHistory = async (req, res) => {
	let { user_ID } = req.params;
	History.get(user_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while creating result",
			});
		}
		res.send(data);
	});
};

exports.getAllHistory = async (req, res) => {
	let { user_ID } = req.params;
	History.getAllHis(user_ID, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error while creating result",
			});
		}
		res.send(data);
	});
};
