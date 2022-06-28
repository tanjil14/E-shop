const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");
module.exports.hashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports.createToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
};
