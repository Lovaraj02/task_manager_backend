const Task = require('../models/Task')
const Signup = require("../models/Signup")
const taskCont = async(req,res)=>{
    try {
        const {title,content} = req.body
        const signup = await Signup.findById(req.signupId)
        if(!signup){
            return res.status(401).json({message:"not found sinupId"})
        }
        const newTask = new Task({
            title,
            content,
            signup:signup._id
        })
        await newTask.save()
        signup.tasks.push(newTask._id)
        await signup.save()
        res.status(201).json({message:"task added successfully"})
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"server error"})
    }
}

const getAllTasks = async (req,res)=>{
    try {
        const allTasks = await Signup.findById(req.signupId).populate("tasks")
        if (!allTasks) {
                return res.status(404).json({ message: "User not found" });
            }

        res.status(200).json({ tasks: allTasks.tasks });
    } catch (error) {
        console.log(error);
        res.status(501).json({ message: "Server error" });
    }
};

const deleteTask = async (req,res)=>{
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = {taskCont,getAllTasks,deleteTask}