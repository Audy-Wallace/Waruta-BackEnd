const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/room");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.use(authorization);

router.post("/", RoomController.createRoom);
router.patch("/", RoomController.updateRoom);
router.delete("/", RoomController.deleteRoom);

module.exports = router;
