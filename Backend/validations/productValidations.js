const { body } = require("express-validator");
module.exports = [
  body("title")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("title is required"),
  // body("price").not().isEmpty().trim().escape().withMessage("Is "),
  // body("discount").isEmpty().trim().escape().withMessage("required"),
  // body("category")
  //   .not()
  //   .isEmpty()
  //   .trim()
  //   .escape()
  //   .withMessage("category is required"),
  // body("description")
  //   .not()
  //   .isEmpty()
  //   .trim()
  //   .escape()
  //   .withMessage("description is required"),
  // body("stock").not().isEmpty().trim().escape().withMessage("required"),
];
