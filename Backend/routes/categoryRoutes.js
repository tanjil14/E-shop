const express = require("express");
const { createCategory } = require("../controllers/category");
const { authorization } = require("../services/authorization");
const categoryValidations = require("../validations/categoryValidations");
const router = express.Router();

router.post(
  "/create-category",
  [categoryValidations, authorization],
  createCategory
);
module.exports = router;
