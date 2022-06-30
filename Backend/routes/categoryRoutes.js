const express = require("express");
const { createCategory } = require("../controllers/category");
const categoryValidations = require("../validations/categoryValidations");
const router = express.Router();

router.post("/create-category", categoryValidations, createCategory);
module.exports = router;
