const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    language: {
        type: String,
        required: true
    },
    lessons: [
        {
          type: Schema.Types.ObjectId,
          ref: "lesson"
        }
    ]
});

CourseSchema.statics.findLessons = function (courseId) {
  return this.findById(courseId)
    .populate("lessons")
    .then(course => course.lessons);
}

module.exports = mongoose.model("courses", CourseSchema);