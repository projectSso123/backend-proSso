import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const useAuth = asyncHandler(async(req, res,  next)=>{
    if(req.session && req.session.user){
    return next();
    }
    else{
    throw new ApiError(401,"no user found login first");
    } 
})

