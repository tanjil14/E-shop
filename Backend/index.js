const cors = require("cors");
const express = require("express");
const connect = require("./config/db");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categoryRoutes");
const env = require("./config/envConfig");
const app = express();
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to E-shop" });
});
const port = env.PORT || 6000;

//middleware
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.listen(port, () => {
  connect();
  console.log(`Server is running at port number: ${port}`);
});
