require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect("process.env.MONGO_URI", {
  serverSelectionTimeoutMS: 5000
})

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (error) => {
  console.log("Failed to connect to MongoDB", error)
})

module.exports = mongoose