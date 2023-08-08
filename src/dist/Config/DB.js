"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.DB_STRING;
const DB = () => {
    try {
        mongoose_1.default
            .connect(URL)
            .then(() => {
            console.log("");
        })
            .catch((error) => {
            console.log("Error Occured while Establishing Databasee");
        });
    }
    catch (error) {
        console.log("Database Error");
    }
};
exports.default = DB;
