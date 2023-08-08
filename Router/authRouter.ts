import express,{Router} from "express"
import { CreateUser, SignIn, viewUsers } from "../Controller/AuthController"
import upload from "../Config/Multer"

const authRouter: Router = express.Router()

authRouter.route("/register-user").post(upload,CreateUser)
authRouter.route("/sign-in").post(SignIn)
authRouter.route("/view-users").get(viewUsers)

export default authRouter