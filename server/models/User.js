const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  lessonsCompleted: {
    type: String,
  }
});

UserSchema.statics.updateLessonsCompleted = function (userId, lessonsCompleted) {
  const User = mongoose.model("users");
  console.log(userId);
  console.log(lessonsCompleted);
  return User.findById(userId).then(user => {
    if(user.lessonsCompleted){
      let lessonsArray = user.lessonsCompleted.split(" ");
      if (lessonsArray.includes(lessonsCompleted)) {
        return user;
      } else {
        lessonsArray.push(lessonsCompleted);
        user.lessonsCompleted = lessonsArray.join(" ");;
        user.save();
      }
    }
    return user;
  });
}

module.exports = mongoose.model("users", UserSchema);