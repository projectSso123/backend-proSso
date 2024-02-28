import express from "express"
import bodyParser from "body-parser"
import bcrypt from 'bcrypt'
import cors from 'cors'
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

app.post("/api/login",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    var hash;
    try{
        hash = await bcrypt.hash(password,saltRound)
    }
    catch(err){
    return res.json({"success":false,"message":err}).status(300)
    }
    console.log(hash)
    return res.json(hash)
    // res.setHeader('Authorization', `Bearer ${hash}`)
    // res.redirect(`http://localhost:3000/?token=${token}`)
})
app.post("/test2",(req,res)=>{
    const email = req.body.email;
    console.log(email)
    res.json({email:"email"})
})
app.listen(8080,()=>{
    console.log("server is running on 8080")
})
