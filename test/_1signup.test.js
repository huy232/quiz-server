process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");
let SignUp = require("../src/app/controller/signupController");
var faker = require("faker");
var randomName = faker.internet.userName();
var randomPassword = faker.internet.password();

describe("Sign Up", () => {
	describe("Register without fill in body", () => {
		it("it should have error because wrong format", async () => {
			const User = {
				password: randomPassword,
			};
			chai
				.request(app)
				.post("/sign-up")
				.send(User)
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});
	describe("Register with fill in body", () => {
		it("it should success because fill in body", async () => {
			const User = {
				username: randomName,
				password: randomPassword,
			};
			chai
				.request(app)
				.post("/sign-up")
				.end((err, res) => {
					res.body.length.should.be.eql(!0);
					res.should.have.status(200);
				});
		});
	});
	describe("Register without fill in body", () => {
		it("it should error because doesn't fill in body", async () => {
			const User = {
				username: null,
				password: null,
			};
			chai
				.request(app)
				.post("/sign-up")
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});
});
