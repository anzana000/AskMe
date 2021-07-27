const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const askRouter = require("./routes/askRoute");
const userRouter = require("./routes/userRoute");
const answerRouter = require("./routes/answerRoute");
const app = express();

//Milddlewares
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

//Routes
app.use("/api/v1/ask", askRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/answers", answerRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
