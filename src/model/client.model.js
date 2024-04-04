import mongoose , {Schema} from "mongoose";
import crypto from 'crypto'
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
    unique:true,
},
clientsecret:{
    type:String,

}
})

async function createClientid(applicationname){
        return  crypto.randomBytes(32).toString('hex')+applicationname;
    
}
 async function createClientsecret (){
        return crypto.randomBytes(32).toString('hex');
}
client_schema.post('save',async function(next){
this.clientid = await createClientid(this.applicationname);
this.clientsecret = await createClientsecret();
 await this.save();
 next();
})
export const Client  = mongoose.model("Client",client_schema);