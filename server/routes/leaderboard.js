const express = require("express");
const router = express.Router();
const LeaderboardController = require("../controllers/leaderboard");
const authentication = require("../middlewares/authentication");

router.get("/", LeaderboardController.getAll);
router.post("/", authentication, LeaderboardController.makeLeaderboard);

module.exports = router;
