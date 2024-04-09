import { Client } from "../model/client.model.js";
import { Employee } from "../model/employee.model.js";
import {News} from "../model/news.model.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addnews = asyncHandler(async(req,res)=>{
    const {content, client_id} = req.body;
    if(!content){
        throw new ApiError(400,"please enter content")
    }
    const sessionUser = req.session.user;
    const user = await User.findOne({email:sessionUser.email}) 
    if(!user){
        throw new ApiError(401, "user not found")
   }
   const client = await Client.findOne({clientid:client_id})
   if(!client){
    throw new ApiError(401, "user not found")
   }
   const admin = await Employee.findOne({
   $and:[{user:user._id},{client:client._id}]
   })
   if(!admin){
    throw new ApiError(401, "user not found")
   }
   const news = await News.create({
    client:client._id,
    content:content,
      broadcast:false,
   })
   return res.status(200).json("news added")
})
const getnews = asyncHandler(async(req, res)=>{
    const {client_id}=req.body;
    const client = await Client.findOne({clientid:client_id})
    if(!client ){
        throw new ApiError(401,"client not found")
    }

    const news = await News.find({client:client._id}).exec()
    res.status(200).json(news)
})
const addnotification = asyncHandler(async(req,res)=>{
    const {content, client_id} = req.body;
    if(!content){
        throw new ApiError(400,"please enter content")
    }
    const sessionUser = req.session.user;
    const user = await User.findOne({email:sessionUser.email}) 
    if(!user){
        throw new ApiError(401, "user not found")
   }
   const client = await Client.findOne({clientid:client_id})
   if(!client){
    throw new ApiError(401, "user not found")
   }
   const admin = await Employee.findOne({
   $and:[{user:user._id},{client:client._id}]
   })
   if(!admin){
    throw new ApiError(401, "user not found")
   }
   const notification = await Notification.create({
    client:client._id,
    content:content,
      broadcast:false,
   })
   return res.status(200).json("notification added")
})
const getnotification = asyncHandler(async(req, res)=>{
    const {client_id}=req.body;
    const client = await Client.findOne({clientid:client_id})
    if(!client ){
        throw new ApiError(401,"client not found")
    }

    const news = await Notification.find({client:client._id}).exec()
    res.status(200).json(news)
})
export {addnews,getnews,addnotification,getnotification}