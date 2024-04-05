import mongoose,{Schema} from "mongoose";


const admin_schema = new Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true,
     },
     role:{
        type:String,
        trim:true,
     }
},{
    timestamps:true,
})

export const Admin = mongoose.model("Admin",admin_schema);