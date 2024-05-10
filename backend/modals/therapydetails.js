const mongoose = require("mongoose");
const { Schema } = mongoose;

const therapydetailschema = new Schema({
  childname: {
    type: String, 
    required: true,
  },
  therapynumber: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const TherapyDetails = mongoose.model("TherapyDetails", therapydetailschema);

module.exports = TherapyDetails;
