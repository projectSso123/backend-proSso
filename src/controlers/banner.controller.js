import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/uploadOncloudinary.js";
import { Banner } from "../model/banner.model.js";

const addBanner = asyncHandler(async(req,res)=>{
    const localpath = req.files?.bannner[0]?.path
    const cloudPath = await uploadOnCloudinary(localpath)
    console.log(cloudPath)
    if(!cloudPath){
        throw new ApiError(401,"upload falied")
    }
    const banner = await Banner.create({
        url:cloudPath,
        broadcast:true,
    })
    return res.status(200).json("uploaded successfull")
})
export {addBanner}