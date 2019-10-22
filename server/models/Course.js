const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    language: {
        type: String,
        required: true
    },
    // String is the path name
    icon: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    lessons: [
        {
          type: Schema.Types.ObjectId,
          ref: "lessons"
        }
    ]
});

CourseSchema.statics.findLessons = function (courseId) {
  return this.findById(courseId)
    .populate("lessons")
    .then(course => course.lessons);
}

CourseSchema.statics.addLesson = function (courseId, lessonId) {
  const Course = mongoose.model("courses");
  const Lesson = mongoose.model("lessons");

  return Course.findById(courseId).then(course => {
    return Lesson.findById(lessonId).then(lesson => {
      course.lessons.push(lesson);
      lesson.courses.push(lesson);

      return Promise.all([course.save(), lesson.save()]).then(
        ([course, lesson]) => course
      );
    });
  });
}

CourseSchema.statics.removeLesson = function (courseId, lessonId) {
  const Course = mongoose.model("courses");
  const Lesson = mongoose.model("lessons");

  return Course.findById(courseId).then(course => {
    return Lesson.findById(lessonId).then(lesson => {
      course.lessons.pull(lesson);
      lesson.courses.pull(course);

      return Promise.all([course.save(), lesson.save()]).then(
        ([course, lesson]) => course
      );
    });
  });
};

module.exports = mongoose.model("courses", CourseSchema);