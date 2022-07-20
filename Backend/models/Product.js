const mongoose = require("mongoose");

const ProductSchema =  mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      price:{
        required:true,
        type:Number
      },
      discount:{
        required:true,
        type:Number
      },
      stock:{
        required:true,
        type:Number
      },
      category:{
        required:true,
        type:String
      },
      colors:{
        type:[Map]  //object
      },
      sizes:{
        type:[Map]  //object
      },
      image1:{
        type:String,
        required:true
      },
      image2:{
        type:String,
        required:true
      },
      image3:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },

    },
    { timestamps: true }
  );
  module.exports = mongoose.model("Product", ProductSchema);