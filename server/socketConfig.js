//
const server = require("./bin/http");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true
  },
  allowEIO3: true
});

let randomIndex = 0;
io.on("connection", (socket) => {
  socket.on("joinWaitingRoom", (payload) => {
    socket.join(payload.roomId);

    let totalUser = io.sockets.adapter.rooms.get(payload.roomId);
   
    if (totalUser.size === 1) {
      const random = Math.floor(Math.random() * payload.amoutWords); //words.length
      randomIndex = random;
    }
    //test buat commit
    console.log(totalUser.size, "is connect");


    io.to(payload.roomId).emit("joinedWaitingRoom", {
      totalUser: totalUser.size,
      randomIndex: randomIndex,
    });
  });

  socket.on("hitAnswer", (payload) => {
    io.to(payload.roomId).emit("backAnswer", payload);
  });
});
module.exports = io;
