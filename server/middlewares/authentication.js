const { tokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = tokenToPayload(access_token);
    const userFound = await User.findByPk(payload.id);
    if (!userFound) {
      throw { statusCode: 401 };
    } else {
      req.user = {
        id: userFound.id,
        email: userFound.email,
        isPremium: userFound.isPremium,
        username: userFound.username
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
