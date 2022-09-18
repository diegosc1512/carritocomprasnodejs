const express = require("express");
const ShopingCartController = require("./../controllers/ShopingCartController");
const authController = require("./../controllers/authController");
const shopingCartRouter = express.Router();
//routes
//obtengo todos y agregar
shopingCartRouter
  .route("/")
  .all(authController.protect)
  //.get(ShopingCartController.getAllProducts)
  .post(ShopingCartController.addProductInCart);
//busco por id
shopingCartRouter
  .route("/:id")
  .all(authController.protect)
 // .get(productController.getProductById);
//elimino por id 
shopingCartRouter
  .route("/:id")
  .all(authController.protect)
  .delete(ShopingCartController.deleteProductInCart);
//actualizo por id 
shopingCartRouter
.route("/:id")
.all(authController.protect)
.post(ShopingCartController.paidProductInCartById);

module.exports = shopingCartRouter;
