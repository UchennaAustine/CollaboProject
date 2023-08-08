"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AuthModel = new mongoose_1.default.Schema({
    userName: {
        type: String,
        unique: [true, "Username has being used already"]
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    tasks: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "tasks"
        }]
});
exports.default = mongoose_1.default.model("auths", AuthModel);
