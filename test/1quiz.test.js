process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");

describe("Quiz Topic", () => {
	describe("Get ALL the quiz topics", () => {
		it("it should get all the quiz topics", async () => {
			chai
				.request(app)
				.get("/quiz-topics")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Doesn't get ALL the quiz topics", () => {
		it("it should have error because doesn't get the quiz", async () => {
			chai
				.request(app)
				.get("/quiz-topics")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Get specific quiz ID", () => {
		it("it should success getting Quiz ID", async () => {
			const Quiz = {
				quiz_ID: 1,
			};
			chai
				.request(app)
				.get(`/quiz-topics/${Quiz.quiz_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Doesn't success get specific quiz ID", () => {
		it("it should failed getting specific Quiz ID", async () => {
			const Quiz = {
				quiz_ID: "text",
			};
			chai
				.request(app)
				.get(`/quiz-topics/${Quiz.quiz_ID}`)
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});

	describe("Create a quiz topic", () => {
		it("it should create a quiz topic", async () => {
			const Quiz = {
				quizname: "This is a topic",
				quiztime: 1000,
			};
			chai
				.request(app)
				.post(`/admin/create-quiz`)
				.send(Quiz)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to create a quiz topic", () => {
		it("it should have error because doesn't fill in correct quiz topic infomation", async () => {
			const Quiz = {
				quizname: "A testing quiz topic",
				quiztime: "text",
			};
			chai
				.request(app)
				.post("/admin/create-quiz")
				.send(Quiz)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Update a quiz topic", () => {
		it("it should success updating a quiz topic", async () => {
			const Quiz = {
				quiz_ID: 1,
				quizname: "A testing quiz update",
				quiztime: 1000,
			};
			chai
				.request(app)
				.put(`/admin/update-quiz/${Quiz.quiz_ID}`)
				.send(Quiz.quizname, Quiz.quiztime)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to update a quiz topic", () => {
		it("it should fail updating a quiz topic because wrong URL", async () => {
			const Quiz = {};
			chai
				.request(app)
				.put(`/admin/update-quiz/wrongurl`)
				.send(Quiz)
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});

	// describe("Delete a quiz topic", () => {
	// 	it("it should success deleting a quiz topic", async () => {
	// 		const Quiz = {
	// 			quiz_ID: 27,
	// 		};
	// 		chai
	// 			.request(app)
	// 			.delete(`/admin/delete-quiz/${Quiz.quiz_ID}`)
	// 			.send(Quiz)
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 			});
	// 	});
	// });
	describe("Failed to delete a quiz topic", () => {
		it("it should fail deleting a quiz topic because wrong URL", async () => {
			const Quiz = {};
			chai
				.request(app)
				.delete(`/admin/delete-quiz/wrongurl`)
				.send(Quiz)
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});
});
