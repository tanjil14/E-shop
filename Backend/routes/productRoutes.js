const express = require("express");
const { createProduct } = require("../controllers/product");
const { authorization } = require("../services/authorization");
const router = express.Router();
const productValidation = require("../validations/productValidations");
router.post(
  "/create-product",
  [productValidation, authorization],
  createProduct
);

module.exports = router;
