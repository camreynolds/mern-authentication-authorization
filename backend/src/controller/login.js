const bcrypt = require("bcrypt")
const User = require("../models/User")
const {generateToken} = require("../utils/jwtUtils")

async function login(req,res) {
  try{
    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    
    if(!existingUser){
      throw new Error("User not found.")
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password)
    
    if(!isPasswordValid){
      throw new Error ("Incorrect password.")
    }

    const token = generateToken(existingUser)

    res.status(200).json({mssg: "Login user successfully", token: token, user: existingUser})
  }catch(error){
    res.status(401).json({error: "Invalid credentials."})    
  }
}

module.exports = {login}