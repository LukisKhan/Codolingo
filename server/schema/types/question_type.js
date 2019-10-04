const mongoose = require("mongoose");
const graphql = require("graphql");
const Question = require("../../models/question");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const QuestionType = new GraphQLObjectType({
  name: "QuestionType",
  fields: () => ({
    _id: { type: GraphQLID },
    prompt: { type: GraphQLString },
    answerChoices: { 
      type: new GraphQLList(require("./answer_type")),
      resolve(parentValue) {
        return QuestionType.findAnswers(parentValue._id);
      }
    }
  })
})

module.exports = QuestionType;