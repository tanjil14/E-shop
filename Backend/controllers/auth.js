const { validationResult } = require("express-validator");

const UserModel = require("../models/User");
const { hashedPassword } = require("../utils/hashedPassword");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      const emailExist = await UserModel({ email });
      if (!emailExist) {
        hashedPassword(password);
      } else {
        //email already exist
        return res
          .status(401)
          .json({ errors: [{ msg: `${email} is already taken` }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server internal error!");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
