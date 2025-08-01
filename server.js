const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const signupRoute = require("./routes/signupRoute")
const taskRoute = require('./routes/taskRoute')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4000
app.use(cors())
dotenv.config()
app.use(express.json());
mongoose.connect(process.env.uri)
    .then(()=>{console.log('mongoDb connected successfully..')})
    .catch(()=>{console.log('error in connecting mongoDb')})
app.use('/register',signupRoute)
app.use('/task',taskRoute)
app.use('/', (req,res)=>{
    res.send('<h1>welcome to backend')
})

app.listen(PORT,(req,res)=>{
    console.log(`server started at ${PORT}`)
})