const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
//agregar usuario
exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

//obtener todos
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

//obteber uno por id
exports.getUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  if (foundUser) {
    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
//actualizar
exports.updateUsersById = catchAsync(async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
  if (updateUser) {
    res.status(200).json({
      status: "update success",
      data: {
        user: updateUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
//eliminar 
exports.deleteUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  const newUser = await User.findByIdAndDelete(req.params.id);
  if (foundUser) {
    res.status(200).json({
      status: "delete success",
      data: {
        User: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
