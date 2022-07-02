const express = require("express");
const {
  createCategory,
  allCategories,
  categories,
  fetchCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { authorization } = require("../services/authorization");
const categoryValidations = require("../validations/categoryValidations");
const router = express.Router();

router.get("/categories/:page", authorization, categories);
router.get("/fetch-category/:id", authorization, fetchCategory);
router.get("/categories", allCategories);
router.post(
  "/create-category",
  [categoryValidations, authorization],
  createCategory
);
router.put(
  "/update-category/:id",
  [categoryValidations, authorization],
  updateCategory
);
router.delete("/delete-category/:id", authorization, deleteCategory);

module.exports = router;
