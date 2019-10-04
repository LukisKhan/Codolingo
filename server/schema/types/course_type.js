const mongoose = require("mongoose");
const graphql = require("graphql");
const Course = require("../../models/course");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: () => ({
        _id: {type: GraphQLID},
        language: {type: GraphQLString},
        lessons: {
          type: new GraphQLList (require("./lesson_type")),
          resolve(parentValue) {
            return Course.findLessons(parentValue._id);
          }
        }
    })
})

module.exports = CourseType;