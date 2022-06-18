const { Word } = require("../models");

class WordController {
  static async getAll(req, res, next) {
    try {
      const words = await Word.findAll();

      res.status(200).json(words);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WordController;
