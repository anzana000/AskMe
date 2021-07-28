const Answer = require("../models/answerModel");
const handleFactory = require("./handleFactory");

//Middleware {used before createReview}
exports.setTourUserIds = (req, res, next) => {
  // Allowed nested routes
  if (!req.body.question) req.body.question = req.params.askId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllAnswers = handleFactory.getAll(Answer);
exports.getAnswer = handleFactory.getOne(Answer);
exports.createAnswer = handleFactory.createOne(Answer);
exports.updateAnswer = handleFactory.updateOne(Answer, "answer");
exports.deleteAnswer = handleFactory.deleteOne(Answer, "answer");
