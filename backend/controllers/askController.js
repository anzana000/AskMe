Question = require("../models/askModel");
catchAsync = require("../utils/catchAsync");
AppError = require("../utils/appError");
const handleFactory = require("./handleFactory");

exports.askQuestion = handleFactory.createOne(Question);

exports.showAllQuestions = handleFactory.getAll(Question);

exports.getQuestion = handleFactory.getOne(Question);

exports.deleteQuestion = handleFactory.deleteOne(Question, "question"); //this "question" is for identifying if it's question or answer

exports.updateQuestion = handleFactory.updateOne(Question, "question");
