const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/midtrans", authentication, UserController.getMidtransToken);
router.patch("/premium", authentication, UserController.changePremiumStatus);

module.exports = router;
