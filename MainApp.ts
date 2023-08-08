import cors from "cors";
import express,{Application} from "express"
import authRouter from "./Router/authRouter";
import taskRouter from "./Router/taskRouter";

const MainApp = (app:Application)=>{
    app.use(express.json()); //{ limit: "10mb" }
    app.use(
        cors({
          origin: "http://localhost:5173",
          methods: ["GET", "POST", "PATCH", "DELETE"],
        }),
      );
      app.use("/api/v1", authRouter)
      app.use("/api/v1", taskRouter)
      
}

export default MainApp