const express = require("express")
const route = express.Router()
const signupcontroller = require("../controllers/signupcontroller");

route.post('/signup',signupcontroller.signupCont)
route.post('/login',signupcontroller.loginCont)

module.exports = route