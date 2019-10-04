const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
// const models = require("./models");
const schema = require("./schema/schema");

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongo"))
  .catch(err => console.log(err))

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());


const expressGraphQL = require("express-graphql");

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      graphiql: true,
      // context: {
      //   token: req.headers.authorization
      // }
    };
  })
)
module.exports = app;