process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");

describe("Histories", () => {
	describe("Get a single newest history based on the User ID", () => {
		it("it should get the history based on the User ID", async () => {
			const User = { user_ID: 27 };
			chai
				.request(app)
				.get(`/get-history/${User.user_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to get a single newest history based on the User ID", () => {
		it("it shouldn't get the history based on the User ID", async () => {
			const User = { user_ID: "text" };
			chai
				.request(app)
				.get(`/get-history/${User.user_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Get ALL the history based on User ID", () => {
		it("it should get all the history based on User ID", async () => {
			const User = { user_ID: 26 };
			chai
				.request(app)
				.get(`/history/${User.user_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Doesn't get ALL the result based on User ID", () => {
		it("it should failed getting answer ID because wrong data type input", async () => {
			const User = { user_ID: "text" };
			chai
				.request(app)
				.get(`/history/${User.user_ID}`)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Creating a new history", () => {
		it("it should success creating a new history", async () => {
			const History = {
				user_ID: 16,
				quiz_ID: 6,
			};
			chai
				.request(app)
				.post(`/create-history`)
				.send(History)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Failed to create a new history", () => {
		it("it shouldn't creating a new history because doesn't pass History into POST", async () => {
			const History = {
				user_ID: 16,
				quiz_ID: 6,
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
