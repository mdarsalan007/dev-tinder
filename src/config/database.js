const mongoose = require("mongoose");
 require("dotenv").config();
 const uri = process.env.MONGO_URI;


const connectDB = async ()=>{
    await mongoose.connect(uri);
}


module.exports = connectDB;
