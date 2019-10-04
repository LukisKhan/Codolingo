const mongoose = require("mongoose");
const graphql = require("graphql");
const Lesson = require("../../models/lesson");

const {GraphQLObjectType, GraphQLID, GraphQLString} = graphql;

const LessonType = new GraphQLObjectType({
    name: "CourseType",
    fields: () => ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString}
    })
})

module.exports = LessonType;