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
        return res
          .status(201)
          .send({ msg: "Your category has been created successfully!" });
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
module.exports.categories = async (req, res) => {
  const currentPage = parseInt(req.params.page) || 1;
  const perPage = 3;
  const skip = currentPage * perPage - perPage;
  try {
    const count = await Categories.find({}).countDocuments();
    const response = await Categories.find({})
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ categories: response, perPage, count });
  } catch (error) {
    return res.status(500).json("Server internal error!");
  }
};
module.exports.allCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json("Server internal error!");
  }
};
