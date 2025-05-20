// connection to db
const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.log(`DB connection error ${err.message}`);
    process.exit(1);
  }
};


module.exports=connection;