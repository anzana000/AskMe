Question = require("../models/askModel");
catchAsync = require("../utils/catchAsync");
AppError = require("../utils/appError");
const handleFactory = require("./handleFactory");

exports.askQuestion = handleFactory.createOne(Question);

exports.showAllQuestions = handleFactory.getAll(Question);

exports.getQuestion = handleFactory.getOne(Question);

exports.deleteQuestion = handleFactory.deleteOne(Question);

exports.updateQuestion = handleFactory.updateOne(Question);
