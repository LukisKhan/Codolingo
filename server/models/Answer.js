const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "question"
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("answers", AnswerSchema);