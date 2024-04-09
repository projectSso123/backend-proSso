import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt  from "jsonwebtoken";
const accesscode_secrete = "skfsjkadsfdasfasdfadsfasdfa"
const verifyToken = asyncHandler(async(req, res,next)=>{
    
    const {token} = req.body
    console.log("auth token ->",token)
   try{
    const data = jwt.verify(token,accesscode_secrete);
    req.token = data.data
    next()
   }
   catch(err){
    throw new ApiError("405","jwt verification error")
   }
})

export {verifyToken}