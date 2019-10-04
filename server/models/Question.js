const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  prompt: {
    type: String,
    required: true
  },
  answerChoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "answers"
      }
  ],
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "lessons"
    }
  ]
});

QuestionSchema.statics.findAnswers = function (questionId) {
  return this.findById(questionId)
    .populate("answers")
    .then(question => question.answerChoices);
}

module.exports = mongoose.model("questions", QuestionSchema);