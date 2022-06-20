if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const router = require("./routes");
const port = process.env.PORT || 3000;
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
// perhatikan
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

io.on("connection", (socket) => {
  socket.on("connecting", (payload) => {
    socket.join(payload.roomId);
    // let temp = {
    //   username: payload.username,
    //   socketId: socket.id,
    //   turn: false
    // }
    payload.users = [...payload.users, payload.username];
    socket.emit("connecting", payload);
    // console.log(payload, ">>>>>>>>>>>");
  });

  socket.on("hitAnswer", (payload) => {
    // console.log(payload);
    // payload.currentPlayer = payload.username;
    // console.log(payload.username);
    io.to(payload.roomId).emit("backAnswer", payload);
  });
});

server.listen(port, () => {
  console.log("This app is running at port:", port);
});
module.exports = { server };
