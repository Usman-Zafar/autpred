const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
  mosteffective: {
    type: String,
    required: true,
  },
  secondmosteffective: {
    type: String,
    required: true,
  },
  leastmosteffective: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
