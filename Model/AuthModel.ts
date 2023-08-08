import mongoose from "mongoose"

export interface IAuth {
    userName?: string
    email?: string
    password?: string
    avatar?: string
    avatarID?: string
    tasks?: {}[]
}

interface IAuthData extends IAuth, mongoose.Document{}

const AuthModel = new mongoose.Schema<IAuth>({
    userName: {
        type: String,
        unique: [true, "Username has being used already"]
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password:{
        type: String,
    },
    avatar:{
        type: String,
    },
    avatarID:{
        type: String,
    },
    tasks:[{
        type: mongoose.Types.ObjectId,
        ref: "tasks"
    }]
})

export default mongoose.model<IAuthData>("auths", AuthModel)