const mongoose = require("mongoose");
require("dotenv").config()

exports.connectionToDB = async()=>{
   try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Successfully")
   } catch (error) {
        console.log(`Something Went Wrong While Connecting with DB , ${error.message}`)
   }
}