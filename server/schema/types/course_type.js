const mongoose = require("mongoose");
const graphql = require("graphql");
// const Course = require("../../models/course");
const Course = mongoose.model("courses");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: () => ({
        _id: {type: GraphQLID},
        language: {type: GraphQLString},
        icon: {type: GraphQLString},
        description: {type: GraphQLString},
        lessons: {
          type: new GraphQLList (require("./lesson_type")),
          resolve(parentValue) {
            return Course.findLessons(parentValue._id);
          }
        }
    })
})

module.exports = CourseType;