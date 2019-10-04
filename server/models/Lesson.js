const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions"
    }
  ],
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "courses"
    }
  ],
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


LessonSchema.statics.addQuestion = function (lessonId, questionId) {
  const Lesson = mongoose.model("lessons");
  const Question = mongoose.model("questions");

  return Lesson.findById(lessonId).then(lesson => {
    return Question.findById(questionId).then(question => {
      lesson.questions.push(question);
      question.lessons.push(lesson);

      return Promise.all([lesson.save(), question.save()]).then(
        ([lesson, question]) => lesson
      );
    });
  });
}

LessonSchema.statics.removeQuestion = function (lessonId, questionId) {
  const Lesson = mongoose.model("lessons");
  const Question = mongoose.model("questions");

  return Lesson.findById(lessonId).then(lesson => {
    return Question.findById(questionId).then(question => {
      lesson.questions.pull(question);
      question.lessons.pull(lesson);

      return Promise.all([lesson.save(), question.save()]).then(
        ([lesson, question]) => lesson
      );
    });
  });
};


module.exports = mongoose.model("lessons", LessonSchema);