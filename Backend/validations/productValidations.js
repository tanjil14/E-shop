const { body } = require("express-validator");
module.exports = [
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("title is required"),
  body("price").trim().escape().withMessage("required"),
  body("discount").trim().escape().withMessage("required"),
  body("category")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("category is required"),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("description is required"),
  body("stock").not().trim().escape().withMessage("required"),
];
