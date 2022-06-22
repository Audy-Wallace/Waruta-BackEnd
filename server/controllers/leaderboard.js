const { Leaderboard, User } = require("../models");

class LeaderboardController {
  static async getAll(req, res, next) {
    try {
      const leadboard = await Leaderboard.findAll({
        include: {
          model: User,
        },
        order: [['score', 'DESC']],
        limit: 20
      });

      res.status(200).json(leadboard);
    } catch (error) {
      next(error);
    }
  }

  static async makeLeaderboard(req, res, next) {
    try {
      const userId = req.user.id;
      const { time, guess, score } = req.body;

      const leaderboard = await Leaderboard.create({
        time,
        guess,
        score,
        userId,
      });

      res.status(201).json({
        message: "created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LeaderboardController;
