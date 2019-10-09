const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  prompt: {
    type: String,
    required: true
  },
  example: {
    type: String,
  },
  answers: [
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
    .then(question => question.answers);
}

QuestionSchema.statics.addAnswer = function (questionId, answerId) {
  const Question = mongoose.model("questions");
  const Answer = mongoose.model("answers");

  return Question.findById(questionId).then(question => {
    return Answer.findById(answerId).then(answer => {
      question.answers.push(answer);
      answer.questions.push(question);

      return Promise.all([question.save(), answer.save()]).then(
        ([question, answer]) => question
      )
    })
  })
}

QuestionSchema.statics.removeAnswer = function (questionId, answerId) {
  const Question = mongoose.model("questions");
  const Answer = mongoose.model("answers");

  return Question.findById(questionId).then(question => {
    return Answer.findById(answerId).then(answer => {
      question.answers.pull(answer);
      answer.questions.pull(answer);

      return Promise.all([question.save(), answer.save()]).then(
        ([question, answer]) => question
      );
    });
  });
};

QuestionSchema.statics.updateQuestion = function (questionId, prompt) {
  const Question = mongoose.model("questions");

  return Question.findById(questionId).then(question => {
    if (question.prompt) {
      question.prompt = prompt;

      question.save().then(question => question);
    }
  })
}

module.exports = mongoose.model("questions", QuestionSchema);