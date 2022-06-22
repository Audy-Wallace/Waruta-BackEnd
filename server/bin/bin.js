require("dotenv").config();
const PORT = process.env.PORT || 3000;
const server = require("./http");
server.listen(PORT, () => {
  console.log("This app is running at port:", PORT);
});
module.exports = server;