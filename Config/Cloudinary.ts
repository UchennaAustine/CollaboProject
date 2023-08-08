import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET,
    secure: true,
  });
  
  export default cloudinary;