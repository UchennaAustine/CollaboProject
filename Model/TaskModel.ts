import mongoose from "mongoose"

export interface ITask {
    User?: {}
    userName?: string
    avatar?: string
    task?: string
}

interface ITaskData extends ITask, mongoose.Document{}

const TaskModel = new mongoose.Schema<ITask>({

    User:{
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    userName:{
        type: String
    },
    task:{
        type: String
    },
    avatar:{
        type: String,
    },

})

export default mongoose.model<ITaskData>("tasks", TaskModel)