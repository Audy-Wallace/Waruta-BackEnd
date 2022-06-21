if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require("express")
const app = express()
const router = require("./routes")
const port = process.env.PORT || 3000
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")
const path = require("path")
const http = require("http")
const { Server } = require("socket.io")
const { log } = require("console")
// perhatikan
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/", router)
app.use(errorHandler)

io.on("connection", (socket) => {
  socket.on("joinWaitingRoom", (payload) => {
    socket.join(payload.roomId)

    console.log("new connection from", socket.id)
    let playerId = socket.id

    socket.on("disconnect", function () {
      console.log(playerId + " disconnected")
    })
    let user1
    let user2
    let totalUser = io.sockets.adapter.rooms.get(payload.roomId)
    console.log(totalUser)
    if (totalUser.size === 2) {
      user1 = [...totalUser].find((user) => user !== socket.id)
      user2 = [...totalUser].find((user) => user === socket.id)
      console.log(user1, user2)
      io.to(payload.roomId).emit("initiateCall", {
        users: { user1, user2 },
        // socketId: usersId
      })
    }
    //test buat commit
    console.log(totalUser.size, "is connect")
    // let usersId = []
    // usersId = [...usersId, socket.id]
    // usersId.push(socket.id)
    io.to(payload.roomId).emit("joinedWaitingRoom", {
      users: totalUser.size,
      // socketId: usersId
    })
  })
  //
  // socket.on("joinGame", (payload) => {
  //   socket.join(payload.roomId);
  //   let users = io.sockets.adapter.rooms.get(payload.roomId);
  //   socket.to(payload.roomId).emit("joinedGame")

  //   console.log(users.size, "is connect");
  // })

  socket.on("totalUser", (payload) => {})

  socket.on("hitAnswer", (payload) => {
    console.log(payload)
    io.to(payload.roomId).emit("backAnswer", payload)
  })
})

server.listen(port, () => {
  console.log("This app is running at port:", port)
})
