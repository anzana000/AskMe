const mongoose = require("mongoose");

const askSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question field is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Question = mongoose.model("Question", askSchema);

module.exports = Question;
