const mongoose = require("mongoose");
const ProductInCartSchema = new mongoose.Schema({
  ShopingCartId: {
    type: String,
    required: true,
    
  },
  productId: {
    type: String,
    required: true,
  },
});

const ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);
module.exports = ProductInCart;