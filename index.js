import connectDB from "./src/db/index.js";
import express from "express";
import {app} from './src/app.js'

connectDB().then(()=>{
    app.listen(8080,()=>{
        console.log("server started");
    })
})