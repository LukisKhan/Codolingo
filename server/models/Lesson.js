const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: {
    type: Schema.Types.ObjectId,
    ref: "questions"
  },
});

LessonSchema.statics.findQuestions = function (lessonId) {
  return this.findById(lessonId)
    .populate("questions")
    .then(lesson => lesson.questions);
}


module.exports = mongoose.model("lessons", LessonSchema);