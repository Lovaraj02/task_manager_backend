const Signup = require("../models/Signup")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.key


const signupCont = async (req,res)=>{
    try {
        const { username, email, password } = req.body;
        const signupEmail = await Signup.findOne({email})
        if(signupEmail){
            return res.status(201).json({message:"email already taken"})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const newSignup = new Signup({
            username,
            email,
            password:hashedPassword
        })
        await newSignup.save()
    
        res.status(201).json({message:"signup saved successfully.."})
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"server error"})
    }
};

//login
const loginCont = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const loginMail = await Signup.findOne({email})
        if(!loginMail || !(await bcrypt.compare(password,loginMail.password)))
            return res.status(401).json({message:"invalid email and password"})
        
        const token = jwt.sign({signupId:loginMail._id},secretKey,{expiresIn:'1h'})
        console.log(email,token)
        res.status(201).json({message:"login successfully",token})
    } catch (error) {
        console.log("error is",error)
        res.status(501).json({message:"server error"})
    }
}



module.exports = {signupCont, loginCont}