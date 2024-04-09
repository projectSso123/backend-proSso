import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt  from "jsonwebtoken";
import { User } from "../model/user.model.js";
import session from "express-session"
const authcode_secrete = "asdkfjsdkfdksafdsakfjssadkfs"
const accesscode_secrete = "skfsjkadsfdasfasdfadsfasdfa"
const refreshcode_secrete = "sfsoainfsafaskldfndskdsfa"
const saltRound = 10


// methods for generating access and refresh token
export const getusers = asyncHandler(async(req,res)=>{
  res.status(200).json(req.session.user)
})
const generateAccessCode = async(payload)=>{
    const accessCode =  jwt.sign({
       data:payload
   },authcode_secrete,{expiresIn:10})
    return accessCode;
   }

   const generateAccessToken = async(payload)=>{
    const accessCode =  jwt.sign({
      data:payload
  },accesscode_secrete,{expiresIn:1000})
   return accessCode;
  }
  const generateRefreshToekn = async(payload)=>{
    const accessCode =  jwt.sign({
      data:payload
  },refreshcode_secrete,{expiresIn:1000})
   return accessCode;
  }

  const getAuthCode = asyncHandler(async(req,res)=>{
  
    const email = req.body.email;
    const state = req.body.state;
    
    const user = await User.findOne({email})
    if(!user){
      console.log(email)
      throw new ApiError(401,"user not found here")
    }
    const payload = {
        user_id:user._id,
        email:user.email,
        state:state,
    }
    const accessCode = await generateAccessCode(payload);
    return res.json(accessCode)
    // return res.redirect(`http://localhost:3000/?token=${hash}`)
})

   
const getAccessCode = asyncHandler(async(req,res)=>{     
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
     throw new ApiError(400,"unauthrorized")
    }
  
    // Assuming the token is in the format: "Bearer <token>"
    const token = authorizationHeader.split(' ')[1];
  
   try{
     const data = jwt.verify(token,authcode_secrete);
     const access_token_payload = {
      user_id:"1213",
      role:"admin",
      use_email:"rob@gmail.com"
     }
     const refresh_token_payload = {
      user_id : "1234"
     }
    const access_token =await generateAccessToken(access_token_payload)
    const refresh_token = await generateRefreshToekn(refresh_token_payload)
    const options = {
      httpOnly:true,
      secure:true
    }
     return res.status(200).
      cookie("accessToken",access_token,options).
      cookie("refreshToken",refresh_token,options).
      json({
        success:true,
        "status":"verified",
        "access_token":token,
        "token_type":"bearer",
        "expires_in":3600,
        "refresh_token":token,
        "scope":"create",
        "state":data.state
        });
   }
   catch(err){
    console.log(err)
    throw new ApiError(400,err)
   }
})

const Signup = asyncHandler(async(req ,res)=>{
  const {name , username, email , password} = req.body
  if( [name, username , email , password].some((field)=> field?.trim() === "")){

    throw new ApiError(400 , "All fields are required")
  }

  const exsitedUser = await User.findOne({
    $or:[{ username:username },{ email:email }]
  })
  if(exsitedUser){
    throw new ApiError(409,"user already exist")
  }
  const user =  await User.create({
    name,
    username,
    email,
    password
  })
  const registeredUser = await User.findOne(user._id).select("-password -refreshToken");


  res.status(200).json(registeredUser)

})

const Signin = asyncHandler(async(req, res)=>{
  const {email, password} = req.body;
  if(email === "" || password === ""){
    throw new ApiError(400, "email or password in required")
  }

  const user = await User.findOne({email});
  if(!user){
    throw new ApiError(404, "user doesn't exist signup first")
  }
  const isvalid = await user.isPasswordCorrect(password)
  if(!isvalid){
    throw new ApiError(401,"password encorrect")
  }
  const userobj = {username:user.username, email:user.email,}
  req.session.user = userobj;
  res.status(200).json({data:"accesstoken"})
// validation about data from the form 
// varify the user 
// send response
})
  
const getProfile = asyncHandler(async(req, res)=>{
  const sessionUser = req.session.user
  const user = await User.findOne({email:sessionUser.email}).select("-password -refreshToken");
  if(!user){
    throw new ApiError(401, "user not found")
  }
  res.status(200).json(user)

})
export {getAuthCode,getAccessCode , Signup , Signin , getProfile}