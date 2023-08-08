import express, { Router } from "express"
import { createTask, deleteTask, viewTask } from "../Controller/TaskController"

const taskRouter: Router = express.Router()

taskRouter.route("/:authId/create-task").post(createTask)
taskRouter.route("/view-task").get(viewTask)
taskRouter.route("/:authId/:taskId/delete-task").delete(deleteTask)

export default taskRouter