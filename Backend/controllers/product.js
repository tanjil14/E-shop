const formidable = require("formidable");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const Products = require("../models/Product");
module.exports.createProduct = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (!err) {
      const parsedData = JSON.parse(fields.data);
      const errors = [];
      if (parsedData.title.trim().length === 0) {
        errors.push({ msg: "Title is required!" });
      }
      if (parseInt(parsedData.price) < 1) {
        errors.push({ msg: "Price should be above $1" });
      }
      if (parseInt(parsedData.discount) < 0) {
        errors.push({ msg: "Discount should not be negative" });
      }
      if (parseInt(parsedData.stock) < 10) {
        errors.push({ msg: "Stock should be above 10" });
      }
      if (fields.description.trim().length === 0) {
        errors.push({ msg: "Description is required" });
      }
      if (errors.length === 0) {
        if (!files["image1"]) {
          errors.push({ msg: "Image1 is required!" });
        }
        if (!files["image2"]) {
          errors.push({ msg: "Image2 is required!" });
        }
        if (!files["image3"]) {
          errors.push({ msg: "Image3 is required!" });
        }
        if (errors.length === 0) {
          const images = {};
          for (let i = 0; i < Object.keys(files).length; i++) {
            const mimeType = files[`image${i + 1}`].mimetype;
            const extension = mimeType.split("/")[1].toLowerCase();
            if (
              extension === "jpeg" ||
              extension === "jpg" ||
              extension === "png"
            ) {
              const imageName = uuidv4() + `.${extension}`;
              const __dirname = path.resolve();
              const newPath =
                __dirname + `/../client/public/images/${imageName}`;
              images[`image${i + 1}`] = imageName;
              fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            } else {
              const error = {};
              error["msg"] = `image${i + 1} has invalid ${extension} type`;
              errors.push(error);
            }
          }
          if (errors.length === 0) {
            try {
              const response = await Products.create({
                title: parsedData.title,
                price: parseInt(parsedData.price),
                discount: parseInt(parsedData.discount),
                stock: parseInt(parsedData.stock),
                category: parsedData.category,
                colors: parsedData.colors,
                sizes: JSON.parse(fields.sizes),
                image1: images["image1"],
                image2: images["image2"],
                image3: images["image3"],
                description: fields.description,
              });
              return res
                .status(201)
                .json({ msg: "Product has created", response });
            } catch (error) {
              console.log(error);
              return res.status(500).json("Server internal error!");
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          return res.status(400).json({ errors });
        }
      } else {
        return res.status(400).json({ errors });
      }
    }
  });
};
module.exports.getProductsByPage = async (req, res) => {
  const currentPage = parseInt(req.params.page) || 1;
  const perPage = 5;
  const skip = currentPage * perPage - perPage;
  try {
    const count = await Products.find({}).countDocuments();
    const response = await Products.find({})
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ products: response, perPage, count });
  } catch (error) {
    return res.status(500).json("Server internal error!");
  }
};
module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findOne({ _id: id }).select([
      "-image1",
      "-image2",
      "-image3",
    ]);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
module.exports.updateProduct = async (req, res,next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const {
        _id,
        title,
        price,
        discount,
        stock,
        colors,
        sizes,
        description,
        category,
      } = req.body;
      const response = await Products.updateOne(
        { _id },
        {
          $set: {
            title,
            price,
            discount,
            stock,
            category,
            colors,
            sizes,
            description,
          },
        }
      );
      return res.status(200).json({ msg: "Product has updated", response });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
