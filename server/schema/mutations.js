const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");

const UserType = require("../schema/types/user_type");
const User = require("../models/User");
const { register, logout, login, verifyUser } = require("../services/auth");

const { GraphQLNonNull } = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // USER AUTH
    register: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return verifyUser(args);
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return User.remove({ _id: id });
      }
    },
  }
})

module.exports = mutation;