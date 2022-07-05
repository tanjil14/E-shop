const express = require("express");
const {
  createProduct,
  getProductsByPage,
  getProductById,
  updateProduct,
} = require("../controllers/product");
// const { productValidations } = require("../validations/productValidations");
const { authorization } = require("../services/authorization");
const router = express.Router();
router.post("/create-product", authorization, createProduct);
router.put("/update-product",authorization , updateProduct);
router.get("/products/:page", authorization, getProductsByPage);
router.get("/product/:id", authorization, getProductById);

module.exports = router;
