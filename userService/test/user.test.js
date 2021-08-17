const expect = require("chai").expect;
const request = require("supertest");
const server = require("../server");
const authenticateToken = require("../src/middlewares/authenticateToken");

const app = request.agent(server);

describe("GET Request", () => {
  describe("get all users", () => {
    it("should return status equal 403 because no auth token", () => {
      app.get("/api/user").end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.a("object");
      });
    });
  });
});
