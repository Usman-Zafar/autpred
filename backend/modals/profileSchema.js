const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  childname: {
    type: String, 
    required: true,
  },
  age: {
    type: Number, 
    required: true,
  },
  parentemail: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
