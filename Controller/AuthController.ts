import express, {Request, Response} from "express"
import cloudinary from "../Config/Cloudinary"
import AuthModel from "../Model/AuthModel" 
import bcrypt from "bcrypt"

export const CreateUser = async(req:Request, res:Response)=>{
    try {
        const {userName, email, password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const {secure_url,public_id} = await cloudinary.uploader.upload(
          req.file!.path
        )

        const user= await AuthModel.create({
            userName,
            email,
            password:hash,
            avatar: secure_url,
            avatarID:public_id
        })
        
        return res.status(201).json({
          message: "User Account has being created",
          data: user
        })
    } catch (error:any) {
       return res.status(404).json({
        message: error.message,
       }) 
    }
}

export const SignIn = async (req: any, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await AuthModel.findOne({ email });
  
      if (user) {
        const checkPassword = await bcrypt.compare(password, user?.password!);
  
        if (checkPassword) {
          return res.status(201).json({
            message: "You are Signed In",
            data: user._id,
          });
        } else {
          res.status(404).json({ message: "Incorrect Password" });
        }
      } else {
        res.status(404).json({ message: "Invalid User" });
      }
    } catch (error) {
      res.status(404).json({
        message: "Error finding author",
      });
    }
  };

  export const viewUsers = async(req:Request, res:Response)=>{
    try {
      const user = await AuthModel.find()
      res.status(200).json({
        message: "Available Users",
        data: user
      })
    } catch (error:any) {
      return res.status(404).json({
        message: error.message
      })
    }
  }