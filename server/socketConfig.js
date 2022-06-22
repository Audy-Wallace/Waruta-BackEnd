const server = require("./bin/http");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
let randomIndex = 0;
io.on("connection", (socket) => {
  socket.on("joinWaitingRoom", (payload) => {
    console.log('====================================');
    console.log(payload);
    console.log('====================================');
    socket.join(payload.roomId);
    // let playerId = socket.id;
    // socket.on("disconnect", function () {
    //   console.log(playerId + " disconnected");
    // });
    let user1;
    let user2;
    let totalUser = io.sockets.adapter.rooms.get(payload.roomId);
    // console.log(totalUser);
    // if (totalUser.size === 2) {
    //   user1 = [...totalUser].find((user) => user !== socket.id);
    //   user2 = [...totalUser].find((user) => user === socket.id);
    //   io.to(payload.roomId).emit("initiateCall", {
    //     users: { user1, user2 },
    //   });
    // }
    if (totalUser.size === 1) {
      const random = Math.floor(Math.random() * payload.amoutWords); //words.length
      console.log(random, "pppppppppppppppppppppppppppppppppppppppppppp");
      randomIndex = random;
    }
    //test buat commit
    io.to(payload.roomId).emit("joinedWaitingRoom", {
      totalUser: totalUser.size,
      randomIndex: randomIndex,
    });
  });

  socket.on("hitAnswer", (payload) => {
    let totalUser = io.sockets.adapter.rooms.get(payload.roomId);
    io.to(payload.roomId).emit("backAnswer", payload);
  });
});
module.exports = io;
