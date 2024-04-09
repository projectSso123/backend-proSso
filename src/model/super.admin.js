import mongoose,{Schema} from "mongoose";

const schema = new Schema({
  user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
  }
},{timestamps:true})

export const SuperAdmin = mongoose.model("SuperAdmin",schema);