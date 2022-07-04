const express = require("express");
const { createProduct } = require("../controllers/product");
const { authorization } = require("../services/authorization");
const router = express.Router();
router.post("/create-product",authorization, createProduct);

module.exports = router;
