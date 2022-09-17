const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
//obtener todos
exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});
//agregar
exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});
//obteber uno por id
exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
//actualizar
exports.updateProductById = catchAsync(async (req, res) => {
  //const foundProduct = await Product.findById(req.params.id);
  const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
  if (updateProduct) {
    res.status(200).json({
      status: "update success",
      data: {
        product: updateProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
//eliminar 
exports.deleteProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  const newProduct = await Product.findByIdAndDelete(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "delete success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

