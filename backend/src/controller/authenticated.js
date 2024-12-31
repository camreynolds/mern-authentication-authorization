const User = require("../models/User")

async function getUser(req,res) {
  try{
    const userId = req.user.id
    
    const user = await User.findById({_id: userId})
    
    if(!user){
      return res.status(404).json({error: "User not found."})
    }

    res.status(200).json(user)
  }catch(error){
    res.status(500).json({error: "Internal server error."})
  }
}

module.exports = {getUser}