const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendResponseWithToken = (user, statusCode, res) => {
  const token = createToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  //Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, passowrdChangedAt } =
    req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  //send response with token
  sendResponseWithToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password is provided
  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  //check if user exist && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError("Incorrect email or password!", 401));

  // if everything is OK, send token to client
  sendResponseWithToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  // 2) Verification  of token
  // 3) Check if user still exists
  // 4) Check if user changed password after the token was issued
  // 5) if all ok grant access
});
