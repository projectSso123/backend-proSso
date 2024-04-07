import { asyncHandler } from "../utils/asyncHandler.js"
import { Client } from "../model/client.model.js";
import { ApiError } from "../utils/ApiError.js";
const clientmiddleware = asyncHandler(async(req, _, next)=>{
    const {grant_type,redirect_uri,client_id,client_secret} = req.body;

    if( [grant_type, redirect_uri , client_id ,client_secret].some((field)=> field?.trim() === "")){
        throw new ApiError(400 , "All fields are required")
    }

    if(grant_type !== "authorization_code" ){
        throw new ApiError(401 , "unauthorized")
    }
    const client = await Client.findOne({clientid:client_id});
    if(!client){
        throw new ApiError(401 , "unauthorized")
    }
    if(client.clientsecret !== client_secret){
        throw new ApiError(401 , "unauthorized")
    }
    next()

})
export default clientmiddleware;