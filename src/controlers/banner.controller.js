import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/uploadOncloudinary.js";
import { Banner } from "../model/banner.model.js";
import { User } from "../model/user.model.js";
import { SuperAdmin } from "../model/super.admin.js";
const addBanner = asyncHandler(async(req,res)=>{
    const localpath = req.file?.path
    console.log("this -> ",req.file)
    const cloudPath = await uploadOnCloudinary(localpath)
    console.log(cloudPath)
    if(!cloudPath){
        throw new ApiError(401,"upload falied")
    }
    const banner = await Banner.create({
        url:cloudPath.url,
        broadcast:true,
    })
    return res.status(200).json("uploaded successfull")
})
const getBanners = asyncHandler(async(req, res)=>{
    const sessionUser = req.session.user;
    const user = await User.findOne({email:sessionUser.email}) 
    if(!user){
        throw new ApiError(401, "user not found")
   }
   const superAdmin = await SuperAdmin.findOne({user:user._id});
   if(!superAdmin){
    throw new ApiError(403,"unauthorized")
   }
   const banners = await Banner.find({broadcast:true}).exec()
   return res.status(200).json(banners)
})
const deletebanner = asyncHandler(async(req, res)=>{
    const {_id} = req.body;
    const sessionUser = req.session.user;
    const user = await User.findOne({email:sessionUser.email}) 
    if(!user){
        throw new ApiError(401, "user not found")
   }
   const superAdmin = await SuperAdmin.findOne({user:user._id});
   if(!superAdmin){
    throw new ApiError(403,"unauthorized")
   }
   const banner = await Banner.deleteOne({_id:_id});
   return res.status(200).json(banner)
})
export {addBanner,getBanners,deletebanner}