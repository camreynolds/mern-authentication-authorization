require("dotenv").config()
const express = require("express")

// import user router
const signupRouter = require("./routes/signup")

// app
const app = express()

// middleware
app.use(express.json())
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

// endpoints
app.use("/user",signupRouter)

// server
app.listen(process.env.PORT, ()=>{
  console.log(`server runnig at port ${process.env.PORT}`)
})