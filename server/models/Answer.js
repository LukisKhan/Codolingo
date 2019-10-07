const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
      type: String,
      required: true
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "question"
    }
  ],
  isCorrect: {
    type: Boolean,
    default: false
  }
});

AnswerSchema.statics.updateAnswer = function (answerId, answerString) {
  const Answer = mongoose.model("answers");

  return Answer.findById(answerId).then(answer => {
    if (answer.answer) {
      answer.answer = answerString;

      answer.save().then(answer => answer);
    }
  })
}

module.exports = mongoose.model("answers", AnswerSchema);