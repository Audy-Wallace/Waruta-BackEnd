const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");

class Word {
  static word() {
    const db = getDb();
    return db.collection("words");
  }

  static async findAll() {
    try {
      const words = await this.word().find().toArray();

      return words;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Word;
