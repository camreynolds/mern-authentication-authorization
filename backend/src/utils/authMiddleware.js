const jwt = require("jsonwebtoken")
const secretKey = require("../configuration/jwtConfig")

function authenticateToken (req,res,next){
  const authHeader = req.header("Authorization")
  
  if(!authHeader){
    return res.status(401).json({error: "Unauthorized: Missing token."})
  }

  const [bearer,token] = authHeader.split(" ")

  if(bearer !== "Bearer" || !token){
    return res.status(401).json({error: "Unauthorized: Invalid token."})
  }

  jwt.verify(token,secretKey, (err, user) =>{
    if(err){
      return res.status(403).json({error: "Forbbiden: Invalid token."})
    }
    
    req.user = user
    next()
  })
}

module.exports = {authenticateToken}