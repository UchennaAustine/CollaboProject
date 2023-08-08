"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskModel = new mongoose_1.default.Schema({
    User: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users"
    },
    userName: {
        type: String
    },
    task: {
        type: String
    },
    avatar: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("tasks", TaskModel);
