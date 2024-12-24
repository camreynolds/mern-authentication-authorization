require("dotenv").config()
const express = require("express")
const signupRouter = require("./routes/signup")

const app = express()

app.use(express.json())

app.listen(process.env.PORT, ()=>{
  console.log(`server runnig at port ${process.env.PORT}`)
})