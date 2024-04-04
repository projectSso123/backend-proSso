import express from "express"
import bodyParser from "body-parser"
import bcrypt from 'bcryptjs'
import cors from 'cors'
import jwt  from "jsonwebtoken"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ApiError } from "./utils/ApiError.js"
import { asyncHandler } from "./utils/asyncHandler.js"
import session from "express-session"

import crypto from 'crypto'
const authcode_secrete = "asdkfjsdkfdksafdsakfjssadkfs"
const accesscode_secrete = "skfsjkadsfdasfasdfadsfasdfa"
const refreshcode_secrete = "sfsoainfsafaskldfndskdsfa"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const saltRound = 10
const app = express()
app.use(cors({
  "origin": ["http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8080"
],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", 
  "credentials":true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('out'));
function customSessionIdGenerator(req) {
  const timestampInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds
  const randomString = crypto.randomBytes(16).toString('hex'); // Generate 16 random bytes and convert to hexadecimal string
  return timestampInSeconds + '-' + randomString;

}
app.use(session({
  genid: customSessionIdGenerator,
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: new session.MemoryStore(),
}))
// app.engine('jsx', reactViews.createEngine());
  
app.get('/testing', (req, res) => {
    res.sendFile(join(__dirname, 'out', 'testing.html'));
  });
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'out', 'index.html'));
});


//import routes 

import authRoutes from './routes/auth.route.js'

import clientRoutes from './routes/client.route.js'
app.use("/api",authRoutes);
app.use("/api",clientRoutes)
export {app};