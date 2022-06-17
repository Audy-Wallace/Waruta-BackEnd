const { User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { isPremium } = req.user;

    if (!isPremium) {
      throw { statusCode: 403 };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
