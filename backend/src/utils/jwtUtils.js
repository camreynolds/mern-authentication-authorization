const jwt = require("jsonwebtoken")
const secretKey = require("../configuration/jwtConfig")

const generateToken = (user) =>{
  const payload = {
    name: user.name,
    email: user.email,
    role: user.role
  }
  return jwt.sign(payload,secretKey, {expiresIn: "1hr"})
}

const generateRefreshToken = (user) =>{
  const payload = {
    name: user.name,
    email: user.email,
    role: user.role
  }

  return jwt.sign(payload,secretKey, {expiresIn: "8hrs"})
}

const verifyToken = (token) =>{
  return jwt.verify(token, secretKey)
}

module.exports = {generateToken, generateRefreshToken, verifyToken}