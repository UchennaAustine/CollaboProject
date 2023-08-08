import {Request, Response} from "express"
import AuthModel from "../Model/AuthModel"
import TaskModel from "../Model/TaskModel"
import mongoose from "mongoose"

export const createTask = async (req:Request, res:Response)=>{
    try {
        const {authId} = req.params
        const {task}= req.body
        const user = await AuthModel.findById(authId)

        const tasks = await TaskModel.create({
            userName: user?.userName,
            task,
            avatar: user?.avatar
        })
        console.log(tasks);

        user?.tasks?.push(new mongoose.Types.ObjectId(tasks._id))
        user?.save()

        return res.status(201).json({
            message: "Tasks",
            data: tasks
        })
    } catch (error:any) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const viewTask = async (req:Request, res:Response)=>{
    try {
        const tasks = await TaskModel.find()
        return res.status(200).json({
            message: "Tasks",
            data: tasks
        })
    } catch (error:any) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const deleteTask = async (req:Request, res:Response)=>{
    try {
        const {authId,taskId} = req.params

        const user:any = await AuthModel.findById(authId)
        const task:any = await TaskModel.findByIdAndDelete(taskId)

        user?.tasks?.pull(new mongoose.Types.ObjectId(task._id))
        user.save()

        return res.status(201).json({
            message: "Deleted",
        })
    } catch (error:any) {
        return res.status(404).json({
            errorMessage: error.message
        })
    }
}