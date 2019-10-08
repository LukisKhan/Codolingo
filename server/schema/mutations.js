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
  GraphQLNonNull,
  GraphQLBoolean,
 } = graphql;

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
        return User.deleteOne({ _id: id });
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
        return Course.deleteOne({ _id: id });
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
    removeLesson: {
      type: LessonType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lesson.deleteOne({ _id: id });
      }
    },
    addQuestionToLesson: {
      type: LessonType,
      args: {
        lessonId: { type: GraphQLID },
        questionId: { type: GraphQLID },
      },
      resolve(parentValue, { lessonId, questionId }) {
        return Lesson.addQuestion(lessonId, questionId);
      }
    },
    removeQuestionFromLesson: {
      type: QuestionType,
      args: {
        lessonId: { type: GraphQLID },
        questionId: { type: GraphQLID },
      },
      resolve(parentValue, { lessonId, questionId }) {
        return Lesson.removeQuestion(lessonId, questionId);
      }
    },
    // Question Mutations
    newQuestion: {
        type: QuestionType,
        args: {
            prompt: { type: new GraphQLNonNull(GraphQLString) },
            example: { type: GraphQLString },
        },
        resolve(parent, args) {
          return new Question(args).save();
        }
    },
    removeQuestion: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Question.deleteOne({ _id: id });
      }
    },
    addAnswerToQuestion: {
      type: QuestionType,
        args: {
          questionId: { type: GraphQLID },
          answerId: { type: GraphQLID },
        },
      resolve(parentValue, { questionId, answerId }) {
        return Question.addAnswer(questionId, answerId);
      }
    },
    removeAnswerFromQuestion: {
      type: QuestionType,
      args: {
          questionId: { type: GraphQLID },
          answerId: { type: GraphQLID }
      },
      resolve(parentValue, { questionId, answerId }) {
        return Question.removeAnswer(questionId, answerId);
      }
    },
    updateQuestion: {
      type: QuestionType,
        args: {
          questionId: { type: GraphQLID },
          prompt: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parentValue, { questionId, prompt }) {
          return Question.updateQuestion(questionId, prompt);
        }
    },
    // Answer Mutations
    newAnswer: {
        type: AnswerType,
        args: {
            answer: { type: new GraphQLNonNull(GraphQLString) },
            isCorrect: { type: GraphQLBoolean}
        },
        resolve(parent, args) {
            return new Answer(args).save();
        }
    },
    removeAnswer: {
      type: AnswerType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Answer.deleteOne({ _id: id });
      }
    },
    updateAnswer: {
      type: AnswerType,
      args: { 
        answerId: { type: GraphQLID },
        answerString: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { answerId, answerString }) {
        return Answer.updateAnswer(answerId, answerString);
      }
    }
  }
})

module.exports = mutation;