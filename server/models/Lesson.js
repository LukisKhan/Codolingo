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
  course: {
    type: Schema.Types.ObjectId,
    ref: "courses"
  }
});

LessonSchema.statics.findQuestions = function (lessonId) {
  return this.findById(lessonId)
    .populate("questions")
    .then(lesson => lesson.questions);
}

LessonSchema.statics.findCourse = function (courseId) {
    return this.findById(courseId)
    .populate("courses")
    .then(lesson => lesson.course);
}

module.exports = mongoose.model("lessons", LessonSchema);