import mongoose , {Schema} from "mongoose";
import crypto from 'crypto'
import { Employee } from "./employee.model.js";
import { nextTick } from "process";
const client_schema  = new Schema({
 applicationname:{
    type:String,
    required:true,
    unique:true,
    index:true,
    lowercase:true,
    trim:true
 },
 homepageURL:{
    type:String,
    required:true,
    trim:true  
 },
 description:{
    type:String,
    trim:true,
 },
callbackURL:{
    type:String,
    trim:true,
    required:true,

},
clientid:{
    type:String,
    index:true,
    unique:true,
},
clientsecret:{
    type:String,

}
},{
    timestamps:true,
})

client_schema.methods.addAdmin = async function(UserId){
const admin = await Employee.create({
    user:UserId,
    client:this._id,
    role:"CLIENT_ADMIN",
    verified:true
})

return admin;
}

async function createClientid(applicationname){
        return  crypto.randomBytes(32).toString('hex')+applicationname;
    
}
 async function createClientsecret (){
        return crypto.randomBytes(32).toString('hex');
}
client_schema.pre('save',async function(next){
    if (this.isNew) { // Check if the document is newly created
        this.clientid = await createClientid("rootsso");
        this.clientsecret = await createClientsecret();
     // Save the document after setting the fields
    }
   next();
})
export const Client  = mongoose.model("Client",client_schema);