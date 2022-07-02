const express = require("express");
const {
  createCategory,
  allCategories,
  categories,
} = require("../controllers/category");
const { authorization } = require("../services/authorization");
const categoryValidations = require("../validations/categoryValidations");
const router = express.Router();

router.get("/categories/:page", authorization, categories);
router.get("/categories", allCategories);
router.post(
  "/create-category",
  [categoryValidations, authorization],
  createCategory
);

module.exports = router;
