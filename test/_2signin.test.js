process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");
var faker = require("faker");
var randomName = faker.internet.userName();
var randomPassword = faker.internet.password();

describe("Sign In", () => {
	describe("Sign In without fill in body", () => {
		it("it should have error because wrong format", async () => {
			const User = {
				password: randomPassword,
			};
			chai
				.request(app)
				.post("/sign-in")
				.send(User)
				.end((err, res) => {
					res.should.have.status(400);
				});
		});
	});
	describe("Sign In without fill in anything in body", () => {
		it("it should have error because nothing fill in", async () => {
			const User = {};
			chai
				.request(app)
				.post("/sign-in")
				.send(User)
				.end((err, res) => {
					res.should.have.status(400);
				});
		});
	});

	describe("Sign In with fill in body", () => {
		it("it should success because fill in body", async () => {
			const User = {
				username: "testing_demo",
				password: "123456",
			};
			chai
				.request(app)
				.post("/sign-in")
				.send(User)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
});
