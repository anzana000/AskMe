const User = require("../models/userModel");
const handleFactory = require("./handleFactory");

exports.getAllUsers = handleFactory.getAll(User);
exports.createUser = handleFactory.createOne(User);
exports.updateUser = handleFactory.updateOne(User);
exports.deleteUser = handleFactory.deleteOne(User);
exports.getUser = handleFactory.getOne(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
