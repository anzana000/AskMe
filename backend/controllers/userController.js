const User = require("../models/userModel");
const handleFactory = require("./handleFactory");

exports.getAllUsers = handleFactory.getAll(User);
