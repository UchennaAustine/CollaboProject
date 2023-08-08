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
exports.viewUsers = exports.SignIn = exports.CreateUser = void 0;
const Cloudinary_1 = __importDefault(require("../Config/Cloudinary"));
const AuthModel_1 = __importDefault(require("../Model/AuthModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield Cloudinary_1.default.uploader.upload(req.file.path);
        const user = yield AuthModel_1.default.create({
            userName,
            email,
            password: hash,
            avatar: secure_url,
            avatarID: public_id
        });
        return res.status(201).json({
            message: "User Account has being created",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
});
exports.CreateUser = CreateUser;
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield AuthModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (checkPassword) {
                return res.status(201).json({
                    message: "You are Signed In",
                    data: user._id,
                });
            }
            else {
                res.status(404).json({ message: "Incorrect Password" });
            }
        }
        else {
            res.status(404).json({ message: "Invalid User" });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "Error finding author",
        });
    }
});
exports.SignIn = SignIn;
const viewUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield AuthModel_1.default.find();
        res.status(200).json({
            message: "Available Users",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.viewUsers = viewUsers;
