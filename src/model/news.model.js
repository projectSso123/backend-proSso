import mongoose from "mongoose";

// Define the schema for your model
const newsSchema = new mongoose.Schema({
    content : {
        type:String,
        required:true,
    }
});

// Compile the schema into a model
const News = mongoose.models.News ||  mongoose.model('News', newsSchema);

export default News ;
