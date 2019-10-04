const express = require("express");
const app = require("./server/server");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const db = require("./config/keys").MONGO_URI;


// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});