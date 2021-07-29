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

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.confirmPassword || req.body.currentPassword)
    return next(
      new AppError("You can't update your password from this route!")
    );
  // 2) Filter out unwanted fields that aren't allowed to be updated
  const filteredBody = filteredObj(req.body, "name", "email");
  // 3) Update document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
