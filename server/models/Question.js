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
      ref: "answer"
    }
  ]
});

module.exports = mongoose.model("questions", QuestionSchema);