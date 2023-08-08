import express,{Application} from "express"
import dotenv from "dotenv"
import MainApp from "./MainApp"
import DB from "./Config/DB"
dotenv.config()
const app: Application = express()

const portType = parseInt(process.env.PORT!)
const port: number = portType

DB()

const server = app.listen(port, async()=>{
    await MainApp(app)
    console.log("Server is Active");
})

process.on("uncaughtException", (error: any)=>{
    console.log("Error is as a result of uncaughtException:",error.message);

    process.exit(1)
})

process.on("unhandledRejection", (reason: any)=>{
    console.log("Error is as a result of unhandledRejection:",reason);

    server.close(()=>{
        process.exit(1)
    })
})
