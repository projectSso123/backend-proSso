import express from "express"
import bodyParser from "body-parser"
import bcrypt from 'bcrypt'
import cors from 'cors'
import jwt  from "jsonwebtoken"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const authcode_secrete = "asdkfjsdkfdksafdsakfjssadkfs"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const saltRound = 10
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('out'));
app.use(express.json())
app.use(express.urlencoded());
// app.engine('jsx', reactViews.createEngine());
app.get('/initiate-auth',(req,res)=>{
    res.redirect("/")
})
app.get('/testing', (req, res) => {
    res.sendFile(join(__dirname, 'out', 'testing.html'));
  });
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'out', 'index.html'));
});

app.post("/api/login",async(req,res)=>{
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
        hash,
        state:state,
    }
    const accessCode = jwt.sign({
        data:payload
    },authcode_secrete,{expiresIn:10})
    return res.json(accessCode)
    // return res.redirect(`http://localhost:3000/?token=${hash}`)
})
app.post("/api/access_token",(req,res)=>{
  console.log("authinitiated")
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      // If no authorization header is present, return a 401 Unauthorized response
      return res.status(401).json({ success:false, error: 'Unauthorized' });
    }
  
    // Assuming the token is in the format: "Bearer <token>"
    const token = authorizationHeader.split(' ')[1];
  
   try{
     const data = jwt.verify(token,authcode_secrete);
     res.status(200).json({
      success:true,
      "status":"verified",
      "access_token":token,
      "token_type":"bearer",
      "expires_in":3600,
      "refresh_token":token,
      "scope":"create",
      "state":data.state
      })
   }
   catch(err){
    return res.status(401).json({success:false,error:"unable to verify due to "+ err});
   }
})
app.listen(8080,()=>{
    console.log("server is running on 8080")
})
