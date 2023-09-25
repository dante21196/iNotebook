const mongoose = require("mongoose");

const dotenv = require('dotenv')
dotenv.config({ path: ('./.env.local') })
const admin = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const mongoURI = `mongodb+srv://${admin}:${password}@testdata-inotebook.rdybtpr.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongo = async() => {
  
  try {
    
    await mongoose.connect(mongoURI,{});
  console.log("Connected to Mongo Successfully")
    
  } catch (error) {
    console.log(error)
  }
  }
  


module.exports = connectToMongo;
