import mongoose from "mongoose";

//  the schema for model
const BannerSchema = new mongoose.Schema({
    links: {
        type: [String], // Array of strings
        required: true,
        default: [],
    }
});

// Compile the schema into a model
const Banner = mongoose.models.Banner ||  mongoose.model('Banner', BannerSchema);

export default Banner ;
