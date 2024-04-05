import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Client } from "../model/client.model.js";
import { User } from "../model/user.model.js";
import { Admin } from "../model/admin.model.js";

const registerclient = asyncHandler(async(req, res)=>{
    const {applicationname , homepageURL, description , callbackURL} = req.body;
  if( [applicationname, homepageURL , description , callbackURL].some((field)=> field?.trim() === "")){

    throw new ApiError(400 , "All fields are required")
  }
 
 
  const userSession = req.session.user
  const user = await User.findOne({email:userSession.email})
 
 
  if(!user){
    throw new ApiError(401, "user not found login first")
  }
  
  
  const ifexist = await Client.findOne({applicationname:applicationname})
   if(ifexist){
    throw new ApiError(401, "client alreay exists")
   }
   console.log("arrived")
  
  
  
   try{
    const client =  await Client.create(
      {
          applicationname:applicationname,
          homepageURL:homepageURL,
          description:description,
          callbackURL:callbackURL,
        }
      )
       const admin = await client.addAdmin(user._id)
       return res.status(200).json(client)
   }


   catch(err){
    console.log(err)
    throw new ApiError(409,`error -> ${err}`)
   }
 
})
const getkeyandsecret = asyncHandler(async(req,res)=>{
  const session = req.session.user
  const {clientid } = req.body
  const  user = await User.findOne({email:session.email})
  if(!user){
    throw new ApiError(401, "user not found")
  }
  
  const client = await Client.findOne({clientid:clientid})
  if(!client){
    throw new ApiError(401, "client not found")
  }
  
  const admin = await Admin.findOne({
    $and:[{ client:client._id },{ user:user._id }]
  });
  if(!admin){
    throw new ApiError(401, "admin not found")
  }
 

  return res.status(200).json({key:client.clientid, secret:client.clientsecret})
})
export {registerclient, getkeyandsecret}
