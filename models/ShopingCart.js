const mongoose = require("mongoose");
const ShopingCartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const ShopingCart = mongoose.model("ShopingCart", ShopingCartSchema);
module.exports = ShopingCart;