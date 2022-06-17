const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;

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
