const express = require("express");
const router = express.Router();
const WordController = require("../controllers/word");

router.get("/", WordController.getAll);

module.exports = router;
