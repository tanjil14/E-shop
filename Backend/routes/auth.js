const express = require("express");
const {
  registerValidations,
  loginValidations,
} = require("../validations/authValidations");
const { register, login } = require("../controllers/auth");
const router = express.Router();

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);

module.exports = router;
