process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");

describe("History Result", () => {
	describe("Get All History Result", () => {
		it("it should get all of history result", async () => {
			chai
				.request(app)
				.get(`/get-all-result`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to get All History Result", () => {
		it("it shouldn't get all of history result because wrong url", async () => {
			chai
				.request(app)
				.get(`/get-all-results`)
				.end((err, res) => {
					res.should.have.status(404);
				});
		});
	});

	describe("Get specific History Result of specific User ID", () => {
		it("it should get specific history result of specific user", async () => {
			const Info = {
				history_ID: 95,
				user_ID: 22,
			};
			chai
				.request(app)
				.get(`/get-specific-result/${Info.history_ID}/${Info.user_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Failed to get specific History Result of specific User ID", () => {
		it("it shouldn't get specific history result of specific user because lack of information providing", async () => {
			const Info = {
				history_ID: 95,
			};
			chai
				.request(app)
				.get(`/get-specific-result/${Info.history_ID}/${Info.user_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Get history result by history ID", () => {
		it("it should get history result successfully", async () => {
			const Info = {
				history_ID: 95,
			};
			chai
				.request(app)
				.get(`/get-history-result/${Info.history_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Failed to get history result by history ID", () => {
		it("it shouldn't get history result ", async () => {
			const Info = {
				history_ID: 95,
				quizname: "text",
			};
			chai
				.request(app)
				.get(`/get-history-result/${Info.history_ID}`)
				.send((err, res) => {
					res.should.have.status(500);
				});
		});
	});

	describe("Update specific History Result of specific User ID", () => {
		it("it should update specific history result of specific user", async () => {
			const Info = {
				question_ID: 13,
				history_ID: 95,
			};
			await chai
				.request(app)
				.patch(`/update-result/${Info.question_ID}/${Info.history_ID}`)
				.send({ answer_result: 19, answer_checkResult: 1 })
				.send((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Failed to update specific History Result of specific User ID", () => {
		it("it shouldn't update specific history result of specific user because lack of parse in information", async () => {
			const Info = {
				question_ID: 13,
				answer_result: 19,
				answer_checkResult: 0,
				history_ID: 95,
			};
			chai
				.request(app)
				.patch(`/update-result/${Info.question_ID}/${Info.history_ID}`)
				.send(Info.question_ID)
				.send((err, res) => {
					res.should.have.status(500);
				});
		});
	});

	describe("Success to delete specific History Result", () => {
		it("it should delete specific history result ", async () => {
			const Info = {
				history_ID: 95,
			};
			chai
				.request(app)
				.delete(`/delete-history/${Info.history_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Failed to delete specific History Result", () => {
		it("it shouldn't delete specific history result because uncorrect history_ID type", async () => {
			const Info = {
				history_ID: "text",
			};
			chai
				.request(app)
				.delete(`/delete-history/${Info.history_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
});
