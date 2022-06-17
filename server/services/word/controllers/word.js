const Word = require("../models/word");

class WordController {
  static async findAll(req, res, next) {
    try {
      const words = await Word.findAll();

      res.status(200).json(words);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = WordController;
