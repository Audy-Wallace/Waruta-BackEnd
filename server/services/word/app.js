if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/mongo");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

connection()
  .then(() => {
    app.listen(port, () => {
      console.log("app connected to " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
