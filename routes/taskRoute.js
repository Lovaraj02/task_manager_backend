const express = require("express")
const route = express.Router()
const verifyToken = require("../middleware/verifyToken")
const taskController = require("../controllers/taskController")

route.post('/create',verifyToken,taskController.taskCont)
route.get('/get-tasks',verifyToken,taskController.getAllTasks)
route.delete('/delete/:id',verifyToken,taskController.deleteTask)

module.exports = route 