import express from "express"
import bodyParser from "body-parser"
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt  from "jsonwebtoken"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ApiError } from "./utils/ApiError.js"
import { asyncHandler } from "./utils/asyncHandler.js"

const authcode_secrete = "asdkfjsdkfdksafdsakfjssadkfs"
const accesscode_secrete = "skfsjkadsfdasfasdfadsfasdfa"
const refreshcode_secrete = "sfsoainfsafaskldfndskdsfa"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const saltRound = 10
const app = express()
app.use(cors({
  "origin": ["http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8080"
],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", 
  "credentials":true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('out'));

// app.engine('jsx', reactViews.createEngine());
  
app.get('/testing', (req, res) => {
    res.sendFile(join(__dirname, 'out', 'testing.html'));
  });
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'out', 'index.html'));
});


//import routes 

import authRoutes from './routes/auth.route.js'


app.use("/api",authRoutes);

const generateAccessCode = async(payload)=>{
 const accessCode =  jwt.sign({
    data:payload
},authcode_secrete,{expiresIn:10})
 return accessCode;
}
//methods
app.post("/login",async(req,res)=>{
    const user_id= 12312;
    const email = req.body.email;
    const password = req.body.password;
    const state = req.body.state;
    var hash;
    try{
        hash = await bcrypt.hash(password,saltRound)
    }
    catch(err){
    return res.json({"success":false,"message":err}).status(300)
    }
    console.log(hash)
    const payload = {
        user_id:user_id,
        email,
    
        state:state,
    }
    const accessCode = await generateAccessCode(payload);
    return res.json(accessCode)
    // return res.redirect(`http://localhost:3000/?token=${hash}`)
})
//methods

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

app.post("/access_token",asyncHandler(async(req,res)=>{     
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
}))
export {app};