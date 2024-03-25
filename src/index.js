import connectDB from "./db/index.js";
import express from "express";
import {app} from './app.js'

connectDB().then(()=>{
    app.listen(8080,()=>{
        console.log("server started");
    })
})