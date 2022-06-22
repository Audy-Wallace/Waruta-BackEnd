const { User, Transaction } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");

const serverKey = process.env.MIDTRANS_SERVER_KEY;
const clientKey = process.env.MIDTRANS_CLIENT_KEY;
const midtransClient = require("midtrans-client");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: serverKey,
  clientKey: clientKey,
});

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, imgUrl } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        imgUrl,
      });

      const payload = { id: user.id };

      const token = payloadToToken(payload);

      res.status(201).json({
        message: "User registered successfully",
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "INVALID_EMAIL" };
      }

      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        throw { name: "INVALID_PASSWORD" };
      }

      const payload = {
        id: user.id,
        username: user.username,
        isPremium: user.isPremium,
      };

      const token = payloadToToken(payload);

      res.status(200).json({
        message: "User logged in successfully",
        access_token: token,
        isPremium: user.isPremium
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMidtransToken(req, res, next) {
    try {
      const { id } = req.user;
      let price = 42000;

      const createTransaction = await Transaction.create({
        price: price,
        userId: id,
      });

      let order_id = Math.floor(Math.random() * 1000000);

      let parameter = {
        transaction_details: {
          order_id: `waruta-development-${order_id}`,
          gross_amount: price,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;

      // console.log("transactionToken:", transactionToken);

      let transactionRedirectUrl = transaction.redirect_url;

      // console.log("transactionRedirectUrl:", transactionRedirectUrl);

      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePremiumStatus(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.update(
        {
          isPremium: true,
        },
        {
          where: {
            id: id,
          },
        }
      );

      const transaction = await Transaction.update(
        {
          status: "finished",
        },
        {
          where: {
            userId: id,
          },
        }
      );

      const payload = {
        id: req.user.id,
        username: req.user.username,
        isPremium: true,
      };

      const token = payloadToToken(payload);
      res.status(200).json({
        message: "User's premium status has been changed",
        access_token: token
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
