const { body } = require("express-validator");

module.exports.registerValidations = [
  body("name").not().isEmpty().trim().escape().withMessage("Name is Required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("Email is Required"),
  body("password")
    .isLength({ min: 6 })
    .trim()
    .withMessage("Password should be 6 character"),
];
module.exports.loginValidations = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("Email is Required"),
  body("password").isLength({ min: 6 }).withMessage("Password is Required!"),
];
