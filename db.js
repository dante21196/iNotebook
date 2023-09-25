const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://Admin:ASHpro21196@testdata-inotebook.rdybtpr.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async() => {
  try {
    await mongoose.connect(mongoURI,{});
  console.log("Connected to Mongo Successfully")
    
  } catch (error) {
    console.log(error)
  }
  }
  


module.exports = connectToMongo;
