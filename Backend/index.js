const express = require("express");
const env = require("./config/envConfig");
const app = express();
console.log(env);
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to E-shop" });
});
const port = env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server is running at port number: ${port}`);
});
