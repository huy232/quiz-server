process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");

describe("Question", () => {
	describe("Get ALL the question", () => {
		it("it should get all the question", async () => {
			chai
				.request(app)
				.get("/admin/get-question-list")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Doesn't get ALL the question", () => {
		it("it should have error because doesn't get the question", async () => {
			chai
				.request(app)
				.get("/admin/get-question-list")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Get specific question ID", () => {
		it("it should success getting question ID", async () => {
			const Question = {
				question_ID: 1,
			};
			chai
				.request(app)
				.get(`/questions/${Question.question_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Doesn't success get specific question ID", () => {
		it("it should failed getting specific Question ID", async () => {
			const Question = {
				question_ID: "text",
			};
			chai
				.request(app)
				.get(`/questions/${Question.question_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Create a question", () => {
		it("it should create a question", async () => {
			const Question = {
				quiz_ID: 1,
				question_desc: "This is a question",
			};
			chai
				.request(app)
				.post(`/admin/create-question`)
				.send(Question)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to create a question", () => {
		it("it should have error because doesn't fill in correct question infomation", async () => {
			const Question = {
				quiz_ID: "A text",
				question_desc: "This is a question",
			};
			chai
				.request(app)
				.post("/admin/create-question")
				.send(Question)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Update a question", () => {
		it("it should success updating a question", async () => {
			const Question = {
				question_ID: 4,
				question_desc: "A testing question update",
				quiz_ID: 1,
			};
			chai
				.request(app)
				.put(`/admin/update-question/${Question.question_ID}`)
				.send(Question.question_desc, Question.quiz_ID)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to update a question", () => {
		it("it should fail updating a question because wrong type of data", async () => {
			const Question = {
				question_ID: 4,
				question_desc: "A testing question update",
				quiz_ID: "text",
			};
			chai
				.request(app)
				.put(`/admin/update-question/${Question.question_ID}`)
				.send(Question)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	// describe("Delete a question", () => {
	// 	it("it should success deleting a question", async () => {
	// 		const Question = {
	// 			question_ID: 24,
	// 		};
	// 		chai
	// 			.request(app)
	// 			.delete(`/admin/delete-question/${Question.question_ID}`)
	// 			.send(Question)
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 			});
	// 	});
	// });
	describe("Failed to delete a question", () => {
		it("it should fail deleting a question because wrong URL", async () => {
			const Question = {};
			chai
				.request(app)
				.delete("/admin/delete-question/wrongurl")
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});
});
