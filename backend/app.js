const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const askRouter = require("./routes/askRoute");
const userRouter = require("./routes/userRoute");
const answerRouter = require("./routes/answerRoute");
const app = express();

// ********************************

//Milddlewares

// ********************************
app.use(cors());
// ********************************

//* Set Security HTTP headers
app.use(helmet());
// ********************************

//* Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // Now it allows 100 request from same ip in a hour
  message: "Too many requests from this IP,please try again in an hour!",
});
app.use("/api", limiter);
// ********************************

//* Body parser, reading data form body into req.body
app.use(express.json({ limit: "10kb" }));

// ********************************

//* Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// ********************************

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// ********************************

//Data Sanitization against XSS
app.use(xss());

// ********************************
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["question"],
  })
);

// ********************************

//Routes
app.use("/api/v1/ask", askRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/answers", answerRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// ********************************

module.exports = app;
