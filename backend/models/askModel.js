const mongoose = require("mongoose");

const askSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question field is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Question must belong to a user"],
      },
    ],

    likes: [
      {
        type: mongoose.ObjectId,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual like
askSchema.virtual("noOfLikes").get(function () {
  return this.likes.length;
});

//Virtual populate
askSchema.virtual("answers", {
  ref: "Answer",
  foreignField: "question",
  localField: "_id",
});

askSchema.pre(/^find/, function (next) {
  this.populate({
    // 'this' points to current query
    path: "user",
    select: "-__v -passwordChangedAt -email",
  });
  next();
});

askSchema.pre(/^find/, function (next) {
  this.populate({
    // 'this' points to current query
    path: "answers",
    select: "-__v",
  });
  next();
});

const Question = mongoose.model("Question", askSchema);

module.exports = Question;
