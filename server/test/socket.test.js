const io = require("socket.io-client");
const server = require("../socketConfig");

describe("Suite of unit tests", function () {
  //ngejalain servernya
  server.attach(3010);
  // let sender;
  // let receiver;
  let socket;

  beforeAll(function (done) {
    // Setup
    socket = io.connect("http://localhost:3010", {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
    });

    socket.on("connect", function () {
      console.log("worked...");
      done();
    });
    socket.on("disconnect", function () {
      console.log("disconnected...");
    });
  });

  afterAll(function (done) {
    // Cleanup
    socket.close();
    done();
  });
  describe("room test", () => {
    // test("waiting room", (done) => {
    //   socket.emit("joinWaitingRoom", { roomId: "room1" });
    //   socket.on("joinedWaitingRoom", (data) => {
    //     expect(data.roomId).toBe("room1");
    //   });
    //   done();
    // });
    test.only("game room", (done) => {
      socket.emit("joinWaitingRoom", { roomId: "room1", amoutWords: 10});
      socket.on("joinedWaitingRoom", (payload) => {
        expect(payload).toHaveProperty("totalUser");
        expect(payload).toHaveProperty("randomIndex");
        console.log('====================================');
        console.log(payload);
        console.log('====================================');
        done();
      });
    });
    test("join game", (done) => {
      socket.emit("joinGame", { roomId: "room1" });
      socket.on("joinGame", (payload) => {
        expect(payload.roomId).toBe("room1");
      });
      done();
    });
    // test("total user", (done) => {
    //   // socket.join("room1");
    //   let totalUser = server.sockets.adapter.rooms.get("room1");
    //   expect(totalUser).toBeDefined();
    //   done();
    // });
    test("hitAnswer", (done) => {
      socket.emit("hitAnswer", { roomId: "room1" });
      socket.on("hitAnswer", (payload) => {
        expect(totalUser).toBeDefined();
      });
      done();
    });
  });
});
