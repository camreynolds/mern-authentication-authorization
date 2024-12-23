require("dotenv").config()
const express = require("express")
const app = express()


// server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})