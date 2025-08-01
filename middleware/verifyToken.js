const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.key
const signupcontroller = require("../controllers/signupcontroller")

const verifyToken = async(req,res,next)=>{
    const token = req.headers.token || req.query.token;
    try {
        if(!token){
            return res.status(401).json({message:"invalid token"})
        }
        const decoded = jwt.verify(token,secretKey)

        req.signupId = decoded.signupId
        next()
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"server error"})
    }
}
module.exports = verifyToken