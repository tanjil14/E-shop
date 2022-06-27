const express = require("express");
const env = require("./config/envConfig");
const connect = require("./config/db");
const cors = require("cors");
const app = express();
console.log(env);
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to E-shop" });
});
const port = env.PORT || 6000;

//middleware
app.use(cors());
app.listen(port, () => {
  connect();
  console.log(`Server is running at port number: ${port}`);
});
