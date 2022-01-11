const db = require("../../database/db.js");

const RankList = function (rankList) {
	this.history_ID = rankList.history_ID;
	this.score = rankList.score;
};
// CREATE ANSWER
RankList.create = async (newRankList, result) => {
	await db.query(
		`SELECT rank_ID FROM ranklist WHERE history_ID = ? AND score = ?`,
		[newRankList.history_ID, newRankList.score],
		async (err, data) => {
			if (data.length !== 0) {
				return result(err, { data: "History record already exists" });
			} else {
				await db.query(
					"INSERT INTO ranklist SET ?",
					newRankList,
					(err, data) => {
						if (err) {
							result(err, null);
							return;
						} else {
							return result(null, { data: "success" });
						}
					}
				);
			}
		}
	);
};

// GET ALL ANSWER
RankList.getAll = (quiz_ID, result) => {
	db.query(
		"SELECT ranklist.rank_ID, ranklist.history_ID, score, histories.history_ID, users.username, users.user_ID, quizs.quiz_ID FROM ranklist LEFT JOIN histories ON (histories.history_ID = ranklist.history_ID) LEFT JOIN users ON (users.user_ID = histories.user_ID) LEFT JOIN quizs ON (quizs.quiz_ID = histories.quiz_ID) WHERE quizs.quiz_ID = ? GROUP BY users.user_ID ORDER BY score DESC",
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

module.exports = RankList;
