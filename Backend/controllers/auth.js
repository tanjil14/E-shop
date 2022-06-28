const { validationResult } = require("express-validator");

const UserModel = require("../models/User");
const { hashedPassword, createToken } = require("../services/authServices");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (!emailExist) {
        const hashed = hashedPassword(password);
        const user = new UserModel({
          ...req.body,
          password: hashed,
        });
        await user.save();
        const token = createToken({
          id: user._id,
          name: user.name,
        });
        return res.status(201).send({ msg: "User has been created.", token });
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
