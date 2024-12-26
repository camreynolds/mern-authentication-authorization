const User = require("../models/User")
const bcrypt = require("bcrypt")

async function createAdminAccount() {
  try{
    const existingAdmin = await User.findOne({email: "admin@test.com"})
    if(!existingAdmin){
      const newAdmin = new User({
        name: "admin",
        email: "admin@test.com",
        password: await bcrypt.hash("abcABC123.",10),
        role: "admin"
      })

      await newAdmin.save()
      console.log("Admin account created successfully")
    }else{
      console.log("Admin account already exist.")      
    }
  }catch(error){
    console.error(error.message)    
  }
}

module.exports = {createAdminAccount}