const mongoose = require("mongoose");
const graphql = require("graphql");
const Course = require("../../models/course");

const {GraphQLObjectType, GraphQLID, GraphQLString} = graphql;

const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: () => ({
        _id: {type: GraphQLID},
        language: {type: GraphQLString}
    })
})

module.exports = CourseType;