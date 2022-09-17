const express = require("express");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");
const productRouter = express.Router();
//routes
//obtengo y agrego
productRouter
  .route("/")
  .all(authController.protect)
  .get(productController.getAllProducts)
  .post(productController.addProduct);
//busco por id
  productRouter
  .route("/:id")
  .all(authController.protect)
  .get(productController.getProductById);
//elimino por id 
productRouter
  .route("/:id")
  .all(authController.protect)
  .delete(productController.deleteProductById);
//actualizo por id 
productRouter
.route("/:id")
.all(authController.protect)
.put(productController.updateProductById);

module.exports = productRouter;
