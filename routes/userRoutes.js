const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const userRouter = express.Router();
//routes
userRouter
  .route("/")
  //.get(productController.getAllProducts)
  .post(userController.addUser);
//productRouter.route("/:id").get(productController.getProductById);

//obtengo todos y agregar
userRouter
  .route("/")
  .all(authController.protect)
  .get(userController.getAllUsers)
//busco por id
userRouter
  .route("/:id")
  .all(authController.protect)
  .get(userController.getUserById);
//elimino por id 
userRouter
  .route("/:id")
  .all(authController.protect)
  .delete(userController.deleteUserById);
//actualizo por id 
userRouter
.route("/:id")
.all(authController.protect)
.put(userController.updateUsersById);

module.exports = userRouter;
