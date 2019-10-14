const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    lessonsCompleted: { type: GraphQLString },
  })
})

module.exports = UserType;