process.env.NODE_ENV = "test";
const app = require("../src/index");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/database/db");
let should = chai.should();
chai.use(chaiHttp);
const { response } = require("express");

describe("Role", () => {
	describe("Get ALL the role", () => {
		it("it should get all the role", async () => {
			chai
				.request(app)
				.get("/admin/get-role-list")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Doesn't get ALL the role", () => {
		it("it should have error because doesn't get the role", async () => {
			chai
				.request(app)
				.get("/admin/get-role-list")
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Get specific role ID", () => {
		it("it should success getting role ID", async () => {
			chai
				.request(app)
				.get(`/admin/find-role`)
				.send({ role_ID: 1 })
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("Doesn't success get specific role ID", () => {
		it("it should failed getting specific role ID because incorrect URL", async () => {
			chai
				.request(app)
				.get(`/admin/find-roles`)
				.send({ Role_ID: 1 })
				.end((err, res) => {
					res.should.have.status(404);
				});
		});
	});

	describe("Create a quiz topic", () => {
		it("it should create a quiz topic", async () => {
			const Role = {
				rolename: "This is a test env role",
			};
			chai
				.request(app)
				.post(`/admin/create-role`)
				.send(Role)
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
	describe("Failed to create a role", () => {
		it("it should have error because mistype of role property", async () => {
			const Role = {
				rolenamez: "A testing quiz topic",
			};
			chai
				.request(app)
				.post("/admin/create-role")
				.send(Role)
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});

	// describe("Delete a role", () => {
	// 	it("it should success deleting a role", async () => {
	// 		const Role = {
	// 			role_ID: 17,
	// 		};
	// 		chai
	// 			.request(app)
	// 			.delete(`/admin/delete-role/${Role.role_ID}`)
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 			});
	// 	});
	// });
	describe("Failed to delete a role", () => {
		it("it should fail deleting a role because mismatch URL type", async () => {
			const Role = {
				role_ID: "text",
			};
			chai
				.request(app)
				.delete(`/admin/delete-role/${Role.role_ID}`)
				.end((err, res) => {
					res.should.have.status(500);
				});
		});
	});
});
