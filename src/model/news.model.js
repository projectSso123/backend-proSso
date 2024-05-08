import mongoose from "mongoose";

// Define the schema for your model
const newsSchema = new mongoose.Schema({
   client:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Client",
   },
   clientname:{
    type:String,
    trim:true,
   },
    content:{
        type:String,
        required:true,
    },
    broadcast:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true,
});

// Compile the schema into a model
export const News  =   mongoose.model('News', newsSchema);


