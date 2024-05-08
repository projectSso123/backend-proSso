import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../model/user.model.js";
import { SuperAdmin } from "../model/super.admin.js";
import { News } from "../model/news.model.js";
import { Notification } from "../model/notification.model.js";
const addNews = asyncHandler(async(req,res)=>{
    const {content} = req.body;
    if(!content){
        throw new ApiError(400,"please enter content")
    }
    const sessionUser = req.session.user;
    const user = await User.findOne({email:sessionUser.email}) 
    if(!user){
        throw new ApiError(401, "user not found")
   }
   const superAdmin = await SuperAdmin.findOne({user:user._id});
   if(!superAdmin){
    throw new ApiError(403,"unauthorized")
   }
   const news = await News.create({
    content:content,
      broadcast:true,
   })
   return res.status(200).json("news added")
})
const getNews = asyncHandler(async(req, res)=>{

   const news = await News.find({}).exec()
   res.status(200).json(news)
})



const updateNews = asyncHandler(async(req,res)=>{
    const sessionUser = req.session.user;
    
    const user = await User.findOne({email:sessionUser.email}) 
    if(!user){
        throw new ApiError(401, "user not found")
   }
   const superAdmin = await SuperAdmin.findOne({user:user._id});
   if(!superAdmin){
    throw new ApiError(403,"unauthorized")
   }
    const {newsid,content} = req.body
    if(!content || !newsid){
        throw new ApiError(409,"all field required")
    }
    const news = await News.updateOne({_id:newsid},{$set:{content:content}})
    res.status(200).json(news)
})
const addNotification = asyncHandler(async(req,res)=>{
    const {content} = req.body;
    if(!content){
        throw new ApiError(400,"please enter content")
    }
    const sessionUser = req.session.user;
    const user = await User.findOne({email:sessionUser.email}) 
    if(!user){
        throw new ApiError(401, "user not found")
   }
   const superAdmin = await SuperAdmin.findOne({user:user._id});
   if(!superAdmin){
    throw new ApiError(403,"unauthorized")
   }
   const notification = await Notification.create({
    content:content,
      broadcast:true,
   })
   return res.status(200).json("news added")
})
const getNotifications = asyncHandler(async(req, res)=>{
  
   const news = await Notification.find({}).exec()
   res.status(200).json(news)
})
export {addNews,getNews,addNotification,getNotifications,updateNews}