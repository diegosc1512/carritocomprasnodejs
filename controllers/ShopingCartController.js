const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const ShopingCart = require("../models/ShopingCart");
const ProductInCart = require("../models/ProductInCart");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

//POST /api/v1/cart/product  -- Si existe un shopping cart que este en estado PENDING anadir el producto a ese carrito,
// si no creamos el carrito de compras y anadimos el primer producto
exports.addProductInCart = catchAsync(async (req, res) => {
    const foundUserId = await ShopingCart.findOne({ userId : req.body.userId });
    const foundStatus = await ShopingCart.findOne({ status : req.body.status });
    console.log("variables al inicio :"+foundUserId.userId +" //"+ foundStatus.status); 
    if (foundUserId.userId && foundStatus.status == "PENDING") {
      //const newShopingCart = await ShopingCart.create(req.body);
      var shopingCartExist = await ShopingCart.findOne({ $or: [{ userId : req.body.userId }, { status : req.body.status }] });
      const newProductInCart = await ProductInCart.create({ ShopingCartId : shopingCartExist.id , productId : req.body.productId });
      res.status(200).json({
        status: "success",
        data: {
          ShopingCart : shopingCartExist,
          ProductInCart : newProductInCart,
        },
      });
    } else {
      console.log("llego al else :"+req.body.userId +" //"+ req.body.status) ;
      const newShopingCart = await ShopingCart.create({ userId : req.body.userId , status : "PENDING" });
      const newProductInCart = await ProductInCart.create({ ShopingCartId : newShopingCart.id , productId : req.body.productId });
      res.status(200).json({
        status: "success",
        data: {
          ShopingCart : newShopingCart,
          ProductInCart : newProductInCart,
        },
      });
    }
  });
//DELETE /api/v1/cart/product/:id -- Si existe un shopping cart que este en estado pending y que tenga ese producto removemos el 
//producto de ese carrito, sino damos error
  exports.deleteProductInCart = catchAsync(async (req, res) => {
    const foundProductId = await ProductInCart.findOne({ productId : req.params.productId });
    const foundShopingCart = await ShopingCart.findOne({ status : "PENDING"  });//req.body.status
    console.log("variables al inicio :"+foundProductId.productId +" //"+ foundShopingCart.status); 
    if (foundProductId.productId && foundShopingCart.status == "PENDING" && foundShopingCart) {
      const newUser = await ProductInCart.findByIdAndDelete(req.params.id); 
      res.status(200).json({
        status: "delete success",
        data: {
          ShopingCart : foundShopingCart,
          ProductInCart : foundProductId,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
  });
//POST /api/v1/cart/pay -- Paga el carrito que este en estado pendiente con minimo un producto en el. 
//Si no existe un carrito con estas caracteristicas se dispara un error

exports.paidProductInCartById = catchAsync(async (req, res) => {
  const foundProductId = await ProductInCart.findOne({ productId : req.params.productId , ShopingCartId : req.body.ShopingCartId });
  const foundShopingCart = await ShopingCart.findOne({ ShopingCartId : req.body.ShopingCartId , status : "PENDING"  });
  if (foundProductId.productId && foundShopingCart.status == "PENDING" && foundShopingCart) {
  const paidShopingCart = await ShopingCart.findByIdAndUpdate(foundShopingCart.ShopingCartId, { status : "PAID"  }, { useFindAndModify: false });
    if (paidShopingCart) {
      res.status(200).json({
        status: "paid success",
        data: {
          ShopingCart: paidShopingCart,
        },
      });
    }
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
