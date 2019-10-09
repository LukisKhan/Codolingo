const mongoose = require("mongoose");
const graphql = require("graphql");
// const Question = require("../../models/question");
const Question = mongoose.model("questions");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const QuestionType = new GraphQLObjectType({
  name: "QuestionType",
  fields: () => ({
    _id: { type: GraphQLID },
    prompt: { type: GraphQLString },
    example: { type: GraphQLString },
    hint: { type: GraphQLString },
    answers: { 
      type: new GraphQLList(require("./answer_type")),
      resolve(parentValue) {
        return Question.findAnswers(parentValue._id);
      }
    },
    lessons: {
      type: new GraphQLList(require("./lesson_type")),
      resolve(parentValue) {
        return Question.findById(parentValue.id)
          .populate("lessons")
          .then(question => question.lessons);
      }
    }
  })
})

module.exports = QuestionType;