process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");

describe("Answer", () => {
	describe("Get ALL the answer", () => {
		it("it should get all the answer", async () => {
			chai
				.request(app)
				.get("/admin/get-answer-list")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Doesn't get ALL the answer", () => {
		it("it should have error because doesn't get the answer", async () => {
			chai
				.request(app)
				.get("/admin/get-answer-list")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Get specific answer ID based on question_ID", () => {
		it("it should success getting answer ID", async () => {
			const Answer = {
				question_ID: 14,
			};
			chai
				.request(app)
				.get(`/answer/${Answer.question_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Doesn't success get specific answer ID", () => {
		it("it should failed getting specific Answer ID", async () => {
			const Answer = {
				answer_ID: "text",
			};
			chai
				.request(app)
				.get(`/answers/${Answer.answer_ID}`)
				.end((err, res) => {
					res.should.have.status(404);
				});
		});
	});

	describe("Create an answer", () => {
		it("it should create an answer", async () => {
			const Answer = {
				answer_desc: "This is a new answer",
				answer_result: 1,
				question_ID: 5,
			};
			chai
				.request(app)
				.post(`/admin/create-answer`)
				.send(Answer)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Failed to create a answer", () => {
		it("it should have error because doesn't fill in correct answer infomation", async () => {
			const Answer = {
				question_ID: "A text",
			};
			await chai
				.request(app)
				.post("/admin/create-answer")
				.send(Answer)
				.send(async (err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Update an answer", () => {
		it("it should success updating a answer", async () => {
			const Answer = {
				answer_ID: 5,
				answer_desc: "A testing answer update",
				answer_result: 0,
			};
			chai
				.request(app)
				.patch(`/admin/update-answer/${Answer.answer_ID}`)
				.send(Answer.answer_desc, Answer.answer_result)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to update a answer", () => {
		it("it should fail updating a answer because wrong type of data", async () => {
			const Answer = {
				answer_ID: 4,
				question_ID: "text",
			};
			chai
				.request(app)
				.put(`/admin/update-answer/${Answer.answer_ID}`)
				.send(Answer)
				.end((err, res) => {
					res.should.have.status(404);
				});
		});
	});

	// describe("Delete an answer", () => {
	// 	it("it should success deleting an answer", async () => {
	// 		const Answer = {
	// 			answer_ID: 24,
	// 		};
	// 		chai
	// 			.request(app)
	// 			.delete(`/admin/delete-answer/${Answer.answer_ID}`)
	// 			.send(Answer)
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 			});
	// 	});
	// });

	describe("Failed to delete an answer", () => {
		it("it should fail deleting an answer because wrong URL", async () => {
			const Answer = {};
			chai
				.request(app)
				.delete("/admin/delete-answer/wrongurl")
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});
});
