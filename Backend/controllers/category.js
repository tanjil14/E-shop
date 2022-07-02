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
          .status(200)
          .send({ msg: "Your category has been created successfully!" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} category is already exist` }] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
module.exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const exist = await Categories.findOne({ name });
    if (!exist) {
      await Categories.updateOne({ _id: id }, { $set: { name } });
      return res
        .status(200)
        .json({ msg: "Your category has updated successfully!" });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: `${name} category is already exist` }] });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Categories.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ msg: "Category has deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
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
module.exports.fetchCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Categories.findOne({ _id: id });
    return res.status(200).json({ category: response });
  } catch (error) {
    console.log(error.message);
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
