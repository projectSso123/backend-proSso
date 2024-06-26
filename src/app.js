import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import session from "express-session"

import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use(cors({
  "origin": ["http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8080",
  "https://rtvsso.onrender.com"
],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", 
  "credentials":true
}))
app.use(express.json())
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


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Perform login logic (e.g., check credentials against database)
  if (email === 'admin' && password === 'password') {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'out', 'index.html'));
});
app.get('/dashboard',(req,res)=>{
  res.sendFile(join(__dirname,'out',"dashboard.html"))
})


//import routes 

import authRoutes from './routes/auth.route.js'
import clientRoutes from './routes/client.route.js'
import newsroutes from './routes/news.route.js'
import notificationroute from './routes/notification.route.js'
import bannerroutes from './routes/banner.route.js'
import editorRoutes from './routes/editor.routes.js'

app.use("/api",authRoutes);
app.use("/api",clientRoutes);
app.use("/api",newsroutes)
app.use("/api",notificationroute)
app.use("/api",bannerroutes)
app.use("/api",editorRoutes)

export {app};