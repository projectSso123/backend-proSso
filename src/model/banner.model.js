import mongoose from "mongoose";

//  the schema for model
const BannerSchema = new mongoose.Schema({
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
       },
        url:{
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

export const Banner = mongoose.model('Banner', BannerSchema);
