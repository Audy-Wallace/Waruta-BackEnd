const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const payloadToToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const tokenToPayload = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  payloadToToken,
  tokenToPayload,
};
