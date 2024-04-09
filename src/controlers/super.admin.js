import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../model/user.model.js";
import { SuperAdmin } from "../model/super.admin.js";
import { News } from "../model/news.model.js";
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
export {addNews}