const User = require("../models/User")
const bcrypt = require("bcrypt")

async function createUser (req,res){
  try {
    const {name,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "customer"
    })

    const savedUser = await newUser.save()
    
    res.status(201).json({mssg: "User create successfully", user: savedUser})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {createUser}