"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./Router/authRouter"));
const taskRouter_1 = __importDefault(require("./Router/taskRouter"));
const MainApp = (app) => {
    app.use(express_1.default.json()); //{ limit: "10mb" }
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }));
    app.use("/api/v1", authRouter_1.default);
    app.use("/api/v1", taskRouter_1.default);
};
exports.default = MainApp;
