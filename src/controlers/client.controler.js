import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Client } from "../model/client.model.js";
import { User } from "../model/user.model.js";
import { Employee } from "../model/employee.model.js";

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
  
  const admin = await Employee.findOne({
    $and:[{ client:client._id },{ user:user._id }]
  });
  if(!admin){
    throw new ApiError(401, "admin not found")
  }
 

  return res.status(200).json({key:client.clientid, secret:client.clientsecret})
})

const verifyclient = asyncHandler(async(req,res)=>{
 const {response_type, client_id, redirect_uri , state}= req.body
 if( [response_type, client_id , redirect_uri , state].some((field)=> field?.trim() === "")){

  throw new ApiError(400 , "All fields are required")
}
   const client = await Client.findOne({clientid:client_id})
   if(!client){
    throw new ApiError(400,"Oauth client not found")
   }

  return res.status(200).json("client verified")
})
const addEditor = asyncHandler(async(req,res)=>{
  const { client_id , email} = req.body

  const user = await User.findOne({email:email})
  const client = await Client.findOne({clientid:client_id})
  if(!user){
    throw new ApiError(401, "User not found")
  }
  if(!client){
    throw new ApiError(401, "User not found")
  }
  const employee = await Employee.create({
    user:user._id,
    client:client._id,
    role:"EDITOR-CMS",
    verified:false
  })
  res.status(200).json("editor added successfully")
})
export {registerclient, getkeyandsecret,verifyclient, addEditor}
