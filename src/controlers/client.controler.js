import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Client } from "../model/client.model.js";

const registerclient = asyncHandler(async(req, res)=>{
    const {applicationname , homepageURL, description , callbackURL} = req.body;
  if( [applicationname, homepageURL , description , callbackURL].some((field)=> field?.trim() === "")){

    throw new ApiError(400 , "All fields are required")
  }
   const ifexist = await Client.findOne({applicationname:applicationname})
   if(ifexist){
    throw new ApiError(401, "client alreay exists")
   }
    const client = Client.create(
    {
        applicationname:applicationname,
        homepageURL:homepageURL,
        description:description,
        callbackURL:callbackURL,
    }
    )
    const registeredclient = await Client.findOne(client._id);
    console.log(registeredclient)
    return res.status(200).json(registeredclient)
})
export {registerclient}