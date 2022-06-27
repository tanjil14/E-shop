const express = require("express");
const { registerValidations } = require("../validations/authValidations");
const { register } = require("../controllers/auth");
const router = express.Router();

router.post("/register", registerValidations, register);

module.exports = router;
