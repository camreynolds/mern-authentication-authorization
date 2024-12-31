require("dotenv").config()
const express = require("express")
const {createAdminAccount} = require("./scripts/admin")

// user router
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const authenticatedRoute = require("./routes/authenticated")

// app
const app = express()

// middleware
app.use(express.json())
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

// create admin account
createAdminAccount()

// endpoints
app.use("/user",signupRoute)
app.use("/auth",loginRoute)
app.use("/api", authenticatedRoute)

// server
app.listen(process.env.PORT, ()=>{
  console.log(`server runnig at port ${process.env.PORT}`)
})