const { server } = require("../app");
const { Server } = require("socket.io");
const { User, Leaderboard, Transaction, Room } = require("../models");
const request = require("supertest");
const { payloadToToken } = require("../helpers/jwt");
let token;
let user;
beforeAll(async () => {
  const createdUser = await User.create({
    username: "test",
    email: "test@mail.com",
    password: "123456",
    imgUrl:
      "https://www.lifewire.com/thmb/LnZ1-grUbUahM3mMKG_X4iBpZvA=/1301x732/smart/filters:no_upscale()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
  });
  user = createdUser;
  token = payloadToToken({ id: createdUser.id });
});
describe("test suite for words route", () => {
  describe("GET /words", () => {
    test("GET SUCCESS", async () => {
      const response = await request(server).get("/words");
      const words = response.body;
      expect(response.statusCode).toBe(200);
      expect(words).toBeDefined();
      expect(Object.keys(words[0])).toEqual([
        "id",
        "name",
        "location",
        "color",
        "ingredient",
        "taste",
        "clue",
        "imgUrl",
        "createdAt",
        "updatedAt",
      ]);
    });
  });
});
describe("test suite for users route", () => {
  describe("POST /users/register", () => {
    test("GET SUCCESS", async () => {
      const response = await request(server).post("/users/register").send({
        username: "abcde",
        email: "urmum@mail.com",
        password: "12345678",
        imgUrl:
          "https://www.lifewire.com/thmb/LnZ1-grUbUahM3mMKG_X4iBpZvA=/1301x732/smart/filters:no_upscale()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
      });
      expect(response.statusCode).toBe(201);
    });
    test("UNIQUE CONSTRAINT", async () => {
      const response = await request(server).post("/users/register").send({
        username: "abcde",
        email: "urmum@mail.com",
        password: "12345678",
        imgUrl:
          "https://www.lifewire.com/thmb/LnZ1-grUbUahM3mMKG_X4iBpZvA=/1301x732/smart/filters:no_upscale()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
      });
      expect(response.statusCode).toBe(400);
    });
    test("VALIDATION ERROR", async () => {
      const response = await request(server).post("/users/register").send({
        imgUrl:
          "https://www.lifewire.com/thmb/LnZ1-grUbUahM3mMKG_X4iBpZvA=/1301x732/smart/filters:no_upscale()/ScreenShot2020-04-20at10.03.23AM-d55387c4422940be9a4f353182bd778c.jpg",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("POST /users/login", () => {
    test("GET SUCCESS", async () => {
      const response = await request(server).post("/users/login").send({
        email: "urmum@mail.com",
        password: "12345678",
      });
      expect(response.statusCode).toBe(200);
    });
    test("INVALID EMAIL", async () => {
      try {
        const response = await request(server).post("/users/login").send({
          email: "",
          password: "12345678",
        });
        expect(response.statusCode).toBe(401);
      } catch (error) {
        console.log(error);
      }
    });
    test("INVALID PASSWORD", async () => {
      try {
        const response = await request(server).post("/users/login").send({
          email: "test@mail.com",
          password: "",
        });
        expect(response.statusCode).toBe(401);
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe("GET /midtrans", () => {
    test("GET SUCCESS", async () => {
      const response = await request(server)
        .get("/users/midtrans")
        .set("access_token", token);
      expect(response.statusCode).toBe(200);
    });
    test("INVALID TOKEN", async () => {
      const response = await request(server)
        .get("/users/midtrans")
        .set("access_token", "token ngasal");
      expect(response.statusCode).toBe(401);
    });
  });
  describe("PATCH /premium", () => {
    test("PATCH SUCCESS", async () => {
      const response = await request(server)
        .patch("/users/premium")
        .set("access_token", token);
      expect(response.statusCode).toBe(200);
    });
    test("INVALID TOKEN", async () => {
      const response = await request(server)
        .patch("/users/premium")
        .set("access_token", "token ngasal");
      expect(response.statusCode).toBe(401);
    });
  });
});
describe("test suite for leaderboard route", () => {
  describe("GET /leaderboard", () => {
    test("GET SUCCESS", async () => {
      const response = await request(server).get("/leaderboard");
      const leaderboard = response.body;
      expect(response.statusCode).toBe(200);
    });
  });
  describe("POST /leaderboard", () => {
    test("POST SUCCESS", async () => {
      const response = await request(server)
        .post("/leaderboard")
        .set("access_token", token)
        .send({
          time: 10,
          guess: 2,
          score: 100,
        });
      expect(response.statusCode).toBe(201);
    });
    test("Invalid Token", async () => {
      const response = await request(server)
        .post("/leaderboard")
        .set("access_token", "token ngasal")
        .send({
          time: 10,
          guess: 2,
          score: 100,
        });
      expect(response.statusCode).toBe(401);
    });
  });
});
describe("test suite for rooms route", () => {
  describe("POST /rooms", () => {
    test("POST SUCCESS", async () => {
      const response = await request(server)
        .post("/rooms")
        .set("access_token", token)
        .send({
          roomCode: "123456",
        });
      expect(response.statusCode).toBe(201);
    });
  });
  describe("PATCH /rooms", () => {
    test("PATCH SUCCESS", async () => {
      const response = await request(server)
        .patch("/rooms")
        .set("access_token", token)
        .send({
          roomCode: "123456",
        });
      expect(response.statusCode).toBe(200);
    });
    test("PATCH FAIL NO ROOM FOUND", async () => {
      const response = await request(server)
        .patch("/rooms")
        .set("access_token", token)
        .send({
          roomCode: "1234",
        });
      expect(response.statusCode).toBe(404);
    });
    test("PATCH FAIL", async () => {
      const response = await request(server)
        .patch("/rooms")
        .set("access_token", token)
        .send({
          roomCode: "123456",
        });
      expect(response.statusCode).toBe(403);
    });
  });
});
afterAll(async () => {
  try {
    const deletedTransactions = await Transaction.destroy({
      where: {},
    });
    const deletedRooms = await Room.destroy({
      where: {},
    });
    const totalDeleted = await Leaderboard.destroy({
      where: {},
    });
    const deletedUsers = await User.destroy({
      where: {},
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
});
