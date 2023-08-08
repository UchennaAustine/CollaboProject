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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const MainApp_1 = __importDefault(require("./MainApp"));
const DB_1 = __importDefault(require("./Config/DB"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const portType = parseInt(process.env.PORT);
const port = portType;
(0, DB_1.default)();
const server = app.listen(process.env.port || port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, MainApp_1.default)(app);
    console.log("Server is Active");
}));
process.on("uncaughtException", (error) => {
    console.log("Error is as a result of uncaughtException:", error.message);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Error is as a result of unhandledRejection:", reason);
    server.close(() => {
        process.exit(1);
    });
});
