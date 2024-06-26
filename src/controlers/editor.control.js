import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { Client } from "../model/client.model.js";
import { Employee } from "../model/employee.model.js";
import { News } from "../model/news.model.js";
import { Notification } from "../model/notification.model.js";
const Addnews = asyncHandler(async(req ,res)=>{
    const {content} = req.body;
    const {user_id, client_id} = req.token
    console.log(user_id,client_id)
    if(!content){
        throw new ApiError(400,"please enter content")
    }

   const client = await Client.findOne({clientid:client_id})
   if(!client){
    throw new ApiError(401, "client not found")
   }
   const news = await News.create({
    client:client._id,
    clientname:client.applicationname,
    content:content,
      broadcast:false,
   })
   return res.status(200).json("news added")
})
const Getnews = asyncHandler(async(req ,res)=>{
    const {user_id, client_id} = req.token
    const client = await Client.findOne({clientid:client_id})
    if(!client){
     throw new ApiError(401, "client not found")
    }
    const news = await News.find({client:client._id}).exec()
    res.status(200).json(news)
})
const Addnotification = asyncHandler(async(req ,res)=>{
    const {content} = req.body;
    const {user_id, client_id} = req.token
    if(!content){
        throw new ApiError(400,"please enter content")
    }

  
   const client = await Client.findOne({clientid:client_id})
   if(!client){
    throw new ApiError(401, "user not found")
   }

   const notification = await Notification.create({
    client:client._id,
    clientname:client.applicationname,
    content:content,
      broadcast:false,
   })
   return res.status(200).json("notificaion added")
})
const Getapplication = asyncHandler(async(req ,res)=>{
    const {user_id, client_id} = req.token
    const client = await Client.findOne({clientid:client_id})
    if(!client){
     throw new ApiError(401, "client not found")
    }
    const news = await Notification.find({client:client._id}).exec()
    res.status(200).json(news)
})
export {Addnews,Addnotification,Getnews,Getapplication}