const { validationResult } = require("express-validator");
const Categories = require("../models/Category");
module.exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  const { name } = req.body;
  if (errors.isEmpty()) {
    try {
      const exist = await Categories.findOne({ name });
      if (!exist) {
        await Categories.create({ name });
        return res.status(201).send({ msg: "Category has been created." });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: `${name} category is already exist` }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    return res.status(401).json({ errors: errors.array() });
  }
};
