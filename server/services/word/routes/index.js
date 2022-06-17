const express = require("express");
const router = express.Router();

const WordController = require("../controllers/word");

router.get("/", WordController.findAll);

module.exports = router;
