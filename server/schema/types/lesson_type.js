const mongoose = require("mongoose");
const graphql = require("graphql");
// const Lesson = require("../../models/lesson");
const Lesson = mongoose.model("lessons");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const LessonType = new GraphQLObjectType({
    name: "LessonType",
    fields: () => ({
        _id: {type: GraphQLID},
        title: {type: GraphQLString},
        questions: { 
            type: new GraphQLList (require("./question_type")),
            resolve(parentValue) {
                return Lesson.findQuestions(parentValue._id);
            }
        },
        courses: {
            type: new GraphQLList(require("./course_type")),
            resolve(parentValue) {
                return Lesson.findCourse(parentValue._id)
;            }
        }

    })
})

module.exports = LessonType;