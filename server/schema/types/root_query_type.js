const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const QuestionType = require("./question_type");
const AnswerType = require("./answer_type");
const LessonType = require("./lesson_type");
const CourseType = require("./course_type");
const User = mongoose.model("users");
const Question = mongoose.model("questions");
const Answer = mongoose.model("answers");
const Lesson = mongoose.model("lessons");
const Course = mongoose.model("courses");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve() {
        return Answer.find({});
      }
    },
    answer: {
      type: AnswerType,
      args: { _id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(_, args) {
        return Answer.findById(args._id);
      }
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve() {
        return Question.find({});
      }
    }, 
    question: {
      type: QuestionType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Question.findById(args._id);
      }
    },
    lessons: {
      type: new GraphQLList(LessonType),
      resolve() {
        return Lesson.find({});
      }
    }, 
    lesson: {
      type: LessonType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Lesson.findById(args._id);
      }
    },
    courses: {
      type: new GraphQLList(CourseType),
      resolve() {
        return Course.find({});
      }
    },
    course: {
      type: CourseType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Course.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;