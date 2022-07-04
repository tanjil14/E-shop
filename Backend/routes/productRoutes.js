const express = require("express");
const { createProduct, getProductsByPage } = require("../controllers/product");
const { authorization } = require("../services/authorization");
const router = express.Router();
router.post("/create-product", authorization, createProduct);
router.get("/products/:page", authorization, getProductsByPage);

module.exports = router;
