const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Error");
  }
};

module.exports = connectDB;
