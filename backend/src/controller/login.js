const bcrypt = require("bcrypt")
const User = require("../models/User")
const {generateToken, verifyToken, generateRefreshToken} = require("../utils/jwtUtils")

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

async function refreshToken(req,res) {
  try{
    const {oldToken} = req.body
    const decodedToken = verifyToken(oldToken)

    console.log("Decoded token:",decodedToken);
    

    const existingUser = await User.findById(decodedToken.id)
    
    if(!existingUser){
      throw new Error("User not found.")
    }

    const newToken = generateRefreshToken(existingUser)

    res.status(200).json({mssg: "Refresh token created successfully", token: newToken, user: existingUser})
  }catch(error){
    res.status(401).json({error: "Invalid token."})    
  }
}

module.exports = {login, refreshToken}