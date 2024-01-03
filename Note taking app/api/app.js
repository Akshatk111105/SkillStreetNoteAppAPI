const express = require("express")
const app = express()
const auth = require('./routes/auth')
const list = require('./routes/list')
const mongoose= require("mongoose");
require('dotenv').config()

//Connection to DB
mongoose.connect(process.env.MONGO_URI) //it happens asynchronously
    .then(() => {
    //listen for request
    app.listen(process.env.PORT, ()=>{
        console.log("Connected to db & Listening on Port", process.env.PORT);
    })
})
    .catch((error)=>{
        console.log("Error")
})
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})
// routes
app.use("/api/routes", auth)
app.use("/api/routes1", list)


