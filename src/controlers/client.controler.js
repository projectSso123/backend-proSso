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
const getApplications = asyncHandler(async(req,res)=>{
  const sessionUser = req.session.user;
 const user = await User.findOne({email:sessionUser.email}).select("-password -refreshToken")
 if(!user){
  throw new ApiError(401,"user not found")
 }
 const clients = await Employee.find({
  $and:[{ user:user._id },{ role:"CLIENT_ADMIN" }]
 }).exec()
 let client_details = [];
 for (const client of clients) {
  const temp = await Client.findOne({ _id: client.client }).select("-clientid -clientsecret");
  console.log(temp);
  client_details.push(temp);
}
 
return  res.status(200).json(client_details)
})
const getapplication = asyncHandler(async(req, res)=>{
  const {clientid} = req.body
  const sessionUser = req.session.user;
  const user = await User.findOne({email:sessionUser.email});
  if(!user){
    throw new ApiError(409,"unauthorized")
  }
  const emp = await Employee.findOne({user:user._id ,client:clientid});
  if(!emp){
    throw new ApiError(409,"unauthorized")
  }
  const client = await Client.findOne({_id:clientid});
  if(!client){
    throw new ApiError(401,"no such client found ")
  }
return res.status(200).json(client)
})
const getemployees = asyncHandler(async(req, res)=>{
  const {clientid} = req.body
  const sessionUser = req.session.user;
  const user = await User.findOne({email:sessionUser.email});
  if(!user){
    throw new ApiError(409,"unauthorized")
  }
  const client = await Client.findOne({_id:clientid});
  if(!client){
    throw new ApiError(401,"no such client found ")
  }
  const emp = await Employee.findOne({user:user._id ,client:clientid});
  if(!emp){
    throw new ApiError(409,"unauthorized")
  }
  if(emp.role !== "CLIENT_ADMIN"){
    throw new ApiError(409,"unauthorized")
  }
  const emps = await Employee.find({
    client:client._id
   }).exec()
   let client_details = [];
   for (const e of emps) {
    const temp = await User.findOne({ _id: e.user }).select("-password");
    const temp1 = {"name":temp.name,"email":temp.email  ,"role":e.role,"verified":e.verified}
    console.log(temp1);
    client_details.push(temp1);
  }
   
  return  res.status(200).json(client_details)
})
export {registerclient, getkeyandsecret,verifyclient, addEditor,getApplications ,getapplication,getemployees}
