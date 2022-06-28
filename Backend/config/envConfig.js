const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  URL: process.env.MONGO,
  JWT_SECRET: process.env.JWT_SECRET,
};
