import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL: string = process.env.DB_STRING!;
const DB = () => {
  try {
    mongoose
      .connect(URL)
      .then(() => {
        console.log("");
      })
      .catch((error: any) => {
        console.log("Error Occured while Establishing Databasee");
      });
  } catch (error: any) {
    console.log("Database Error");
  }
};

export default DB