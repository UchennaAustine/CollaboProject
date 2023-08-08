"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.viewTask = exports.createTask = void 0;
const AuthModel_1 = __importDefault(require("../Model/AuthModel"));
const TaskModel_1 = __importDefault(require("../Model/TaskModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { authId } = req.params;
        const { task } = req.body;
        const user = yield AuthModel_1.default.findById(authId);
        const tasks = yield TaskModel_1.default.create({
            userName: user === null || user === void 0 ? void 0 : user.userName,
            task,
            avatar: user === null || user === void 0 ? void 0 : user.avatar
        });
        console.log(tasks);
        (_a = user === null || user === void 0 ? void 0 : user.tasks) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(tasks._id));
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(201).json({
            message: "Tasks",
            data: tasks
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.createTask = createTask;
const viewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield TaskModel_1.default.find();
        return res.status(200).json({
            message: "Tasks",
            data: tasks
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.viewTask = viewTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { authId, taskId } = req.params;
        const user = yield AuthModel_1.default.findById(authId);
        const task = yield TaskModel_1.default.findByIdAndDelete(taskId);
        (_b = user === null || user === void 0 ? void 0 : user.tasks) === null || _b === void 0 ? void 0 : _b.pull(new mongoose_1.default.Types.ObjectId(task._id));
        user.save();
        return res.status(201).json({
            message: "Deleted",
        });
    }
    catch (error) {
        return res.status(404).json({
            errorMessage: error.message
        });
    }
});
exports.deleteTask = deleteTask;
