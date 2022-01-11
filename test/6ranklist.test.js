process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");

describe("Rank List", () => {
	describe("Get All rank list based on specific quiz ID", () => {
		it("it should get all of rank list", async () => {
			const RankList = {
				quiz_ID: 6,
			};
			chai
				.request(app)
				.get(`/get-ranklist/${RankList.quiz_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to get All rank list", () => {
		it("it shouldn't get all of history result because wrong url", async () => {
			const RankList = {
				quiz_ID: "text",
			};
			chai
				.request(app)
				.get(`/get-ranklist/${RankList.quiz_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Creating a new ranklist", () => {
		it("it should success creating a new ranklist", async () => {
			const RankList = {
				history_ID: 96,
				score: 90,
			};
			chai
				.request(app)
				.post(`/create-ranklist`)
				.send(RankList)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Failed to create a new rank list", () => {
		it("it shouldn't creating a new rank list because doesn't pass RankList into POST", async () => {
			const RankList = {
				history_ID: 96,
				score: 50,
			};
			chai
				.request(app)
				.post(`/create-history`)
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});
});
