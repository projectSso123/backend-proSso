import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import dotenv from 'dotenv'
dotenv.config();

const connectDB = asyncHandler(async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI+"/devrtv")
        console.log("database connected");
    }
    catch(error){
        console.log("mongodb connection error", error);
        process.exit(1)
    }
})
export default connectDB;