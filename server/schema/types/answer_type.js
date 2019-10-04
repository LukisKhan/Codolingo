const mongoose = require("mongoose");
const graphql = require("graphql");
// const Answer = require("../../models/answer");
const Answer = mongoose.model("answers");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;

const AnswerType = new GraphQLObjectType({
  name: "AnswerType",
  fields: () => ({
    _id: { type: GraphQLID },
    answer: { type: GraphQLString },
    isCorrect: { type: GraphQLBoolean }
  })
})

module.exports = AnswerType;