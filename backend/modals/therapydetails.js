const mongoose = require("mongoose");
const { Schema } = mongoose;

const therapydetailschema = new Schema({
  childname: {
    type: String, 
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  therapysession:{
    type: Number, 
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
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  }
});

const TherapyDetails = mongoose.model("TherapyDetails", therapydetailschema);

module.exports = TherapyDetails;
