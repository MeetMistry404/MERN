const mongoose = require("mongoose");
const URI = process.env.CONNECT_DB;

const connectDB = async () => {
  try {
    console.log("database connection successful");
    mongoose.connect(URI);
  } catch (error) {
    console.log("database connection unsuccessful");
    process.exit();
  }
};

module.exports = connectDB;
