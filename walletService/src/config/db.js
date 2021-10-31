<<<<<<< HEAD
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      () => console.log("DB Connected Successfully")
    );
  } catch (error) {
    console.log("error:", error);
  }
};


=======
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      () => console.log("DB Connected Successfully")
    );
  } catch (error) {
    console.log("error:", error);
  }
};


>>>>>>> 1770bd5944385bbb24c15fe468a8dc778cd480e0
module.exports = connectDB