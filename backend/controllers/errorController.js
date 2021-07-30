const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: Please use another value `;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token! Please Login Again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your Token has expired! Please login again", 401);

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} ${err.value}`;
  return new AppError(message, 400);
};

const handleValidatorErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  // console.log(Object.values(err.errors));
  const message = `Invalid input data, ${errors.join(", ")}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if ((err.name = "ValidatorError")) error = handleValidatorErrorDB(error);

    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};
