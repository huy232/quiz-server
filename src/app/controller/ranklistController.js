const RankList = require("../models/ranklist.model");

exports.getRankList = async (req, res) => {
	let { quiz_ID } = req.params;
	RankList.getAll(quiz_ID, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Error when getting a ranklist.",
			});
		res.send(data);
	});
};

exports.createRankList = async (req, res) => {
	let { history_ID, score } = req.body;
	let rankList = new RankList({
		history_ID: history_ID,
		score: score,
	});
	RankList.create(rankList, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Error when creating a ranklist",
			});
		}
		res.send({ data });
	});
};
