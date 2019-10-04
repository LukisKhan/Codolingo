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

module.exports = mongoose.model("course", CourseSchema);