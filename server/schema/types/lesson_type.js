const mongoose = require("mongoose");
const graphql = require("graphql");
const Lesson = require("../../models/lesson");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const LessonType = new GraphQLObjectType({
    name: "LessonType",
    fields: () => ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        questions: { 
            type: new GraphQLList (require("./question_type")),
            resolve(parentValue) {
                return LessonType.findQuestions(parentValue._id);
            }
        }
    })
})

module.exports = LessonType;