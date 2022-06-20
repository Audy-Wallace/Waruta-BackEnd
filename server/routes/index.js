const express = require("express");
const router = express.Router();
const user = require("./user");
const word = require("./word");
const leaderboard = require("./leaderboard");
const room = require("./room");

router.use("/users", user);
router.use("/words", word);
router.use("/leaderboard", leaderboard);
router.use("/rooms", room);

module.exports = router;
