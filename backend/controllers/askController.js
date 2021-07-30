Question = require("../models/askModel");
catchAsync = require("../utils/catchAsync");
AppError = require("../utils/appError");
const handleFactory = require("./handleFactory");

exports.askQuestion = handleFactory.createOne(Question);

exports.showAllQuestions = handleFactory.getAll(Question);

exports.getQuestion = handleFactory.getOne(Question);

exports.deleteQuestion = handleFactory.deleteOne(Question, "question"); //this "question" is for identifying if it's question or answer

exports.updateQuestion = handleFactory.updateOne(Question, "question");

exports.addLike = catchAsync(async (req, res, next) => {
  const preventDuplicate = await Question.findById(req.params.like);
  if (preventDuplicate.likes.includes(req.user.id)) {
    await Question.findOneAndUpdate(
      { _id: req.params.like },
      { $pull: { likes: req.user.id } }
    );

    res.status(201).json({
      status: "success",
    });
  } else {
    await Question.findOneAndUpdate(
      { _id: req.params.like },
      { $push: { likes: req.user.id } }
    );

    res.status(201).json({
      status: "success",
    });
  }
});
