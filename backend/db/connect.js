const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/autpred";
const connectDB = async () => {
  try {
    await mongoose.connect(url); 
    console.log("Connected to DataBase");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
