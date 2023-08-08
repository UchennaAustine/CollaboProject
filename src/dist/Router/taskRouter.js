"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../Controller/TaskController");
const taskRouter = express_1.default.Router();
taskRouter.route("/:authId/create-task").post(TaskController_1.createTask);
taskRouter.route("/view-task").get(TaskController_1.viewTask);
taskRouter.route("/:authId/:taskId/delete-task").delete(TaskController_1.deleteTask);
exports.default = taskRouter;
