"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Controller/AuthController");
const Multer_1 = __importDefault(require("../Config/Multer"));
const authRouter = express_1.default.Router();
authRouter.route("/register-user").post(Multer_1.default, AuthController_1.CreateUser);
authRouter.route("/sign-in").post(AuthController_1.SignIn);
authRouter.route("/view-users").get(AuthController_1.viewUsers);
exports.default = authRouter;
