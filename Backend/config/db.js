const mongoose = require("mongoose");
const env = require("./envConfig");
const connect = async () => {
  try {
    await mongoose.connect(env.URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected!");
});

module.exports = connect;
