const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: [true, "Please provide your answer!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
      required: [true, "A answer must be referred to it's question"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A answer must belong to user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

answerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
