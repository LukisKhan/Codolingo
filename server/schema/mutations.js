const graphql = require("graphql");
const mongoose = require("mongoose");
const CourseType = require("../schema/types/course_type");
const Course = mongoose.model("courses");
const LessonType = require("../schema/types/lesson_type");
const Lesson = mongoose.model("lessons");
const QuestionType = require("../schema/types/question_type");
const Question = mongoose.model("questions");
const AnswerType = require("../schema/types/answer_type");
const Answer = mongoose.model("answers");
const UserType = require("../schema/types/user_type");
const User = require("../models/User");
const { register, logout, login, verifyUser } = require("../services/auth");

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLID, 
  GraphQLList,
  GraphQLNonNull } = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // USER AUTH
    register: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return verifyUser(args);
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return User.remove({ _id: id });
      }
    },
    // Courses Mutations
    newCourse: {
      type: CourseType,
      args: {
        language: { type: new GraphQLNonNull(GraphQLString) },
        lessons: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parent, args) {
        return new Course(args).save();
      }
    },
    removeCourse: {
      type: CourseType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Course.remove({ _id: id });
      }
    },
    addLessonToCourse: {
      type: CourseType,
      args: {
        courseId: { type: GraphQLID },
        lessonId: { type: GraphQLID }
      },
      resolve(parentValue, { courseId, lessonId }) {
        return Course.addLesson(courseId, lessonId);
      }
    },
    removeLessonFromCourse: {
      type: CourseType,
      args: {
        courseId: { type: GraphQLID },
        lessonId: { type: GraphQLID }
      },
      resolve(parentValue, { courseId, lessonId }) {
        return Course.removeLesson(courseId, lessonId);
      }
    },
    // Lesson Mutations
    newLesson: {
      type: LessonType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return new Lesson(args).save();
      }
    },
    // Question Mutations
    newQuestion: {
        type: QuestionType,
        args: {
          prompt: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
          return register(args);
        }
    },
    addLessonQuestion: {
        type: LessonType,
        args: {
            lessonId: { type: GraphQLID },
          questionId: { type: GraphQLID }
        },
        resolve(parentValue, { lessonId, questionId }) {
          return Lesson.addQuestion(lessonId, questionId);
        }
      },
      removeLessonQuestion: {
        type: LessonType,
        args: {
            lessonId: { type: GraphQLID },
          questionId: { type: GraphQLID }
        },
        resolve(parentValue, { lessonId, questionId }) {
          return Lesson.removeQuestion(lessonId, questionId);
        }
    },
    // Answer Mutations
    newAnswer: {
        type: AnswerType,
        args: {
          answer: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
          return register(args);
        }
    },
    addLessonAnswer: {
        type: LessonType,
        args: {
            lessonId: { type: GraphQLID },
          answerId: { type: GraphQLID }
        },
        resolve(parentValue, { lessonId, answerId }) {
          return Lesson.addAnswer(lessonId, answerId);
        }
      },
      removeLessonAnswer: {
        type: LessonType,
        args: {
            lessonId: { type: GraphQLID },
            answerId: { type: GraphQLID }
        },
        resolve(parentValue, { lessonId, answerId }) {
          return Lesson.removeAnswer(lessonId, answerId);
        }
      }
  }
})

module.exports = mutation;