const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    ref: "questions"
  },
});

module.exports = mongoose.model("lessons", LessonSchema);