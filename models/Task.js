const mongoose = require("mongoose")
const Signup = require("./Signup")
const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    signup:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Signup'
    }
},{timestamps:true})

module.exports = mongoose.model('Task',taskSchema)