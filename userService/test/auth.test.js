const expect = require("chai").expect;
const request = require("supertest");
const server = require("../server");

const app = request.agent(server);

describe("POST request", () => {
  describe("creating a user", () => {
    it("should return access token if user doesn't exist", () => {
      app
        .post("/api/auth/register")
        .send({
          first_name: "Emmanuel",
          last_name: "Bolatito",
          username: "Bolyjay2234",
          password: "Masmas124.",
        })
        .end((err, res) => {
          if (res.status == 201) {
            expect(res.body).to.equal(201);
            expect(res.body).to.a("object");
          }
        });
    });
    it("should return username exist", () => {
      app
        .post("/api/auth/register")
        .send({
          first_name: "Emmanuel",
          last_name: "Bolatito",
          username: "Bolyjay2234",
          password: "Masmas124.",
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body["error_msg"]).to.equal("Username already exists");
        });
    });
  });
});

describe("POST request", () => {
  describe("user login", () => {
    it("should return access token if user exist", () => {
      app
        .post("/api/auth/login")
        .send({
          username: "Bolyjay2234",
          password: "Masmas124.",
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.a("object");
        });
    });
    it("should return incorrect password if user input wrong password", () => {
      app
        .post("/api/auth/login")
        .send({
          username: "Bolyjay2234",
          password: "wrongPassword.",
        })
        .end((err, res) => {
          expect(res.body["err_msg"]).to.equal("incorrect password");
          expect(res.body).to.a("object");
        });
    });
    it("should return User not found if username doesn't exist in database", () => {
      app
        .post("/api/auth/login")
        .send({
          username: "WrongUsername",
          password: "wrongPassword.",
        })
        .end((err, res) => {
          expect(res.body["err_msg"]).to.equal("User not found");
          expect(res.body).to.a("object");
        });
    });
  });
});
