import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/posts.js";
// import Event from "./models/Event.js";
// import { getAllEvents } from "./controllers/Events.js";
// import { users, posts } from "./data/index.js";
// import eventRoutes from "./routes/event.js";
import Event from "./models/Events.js";
import router from "./routes/event.js";
import { submitFormData } from "./controllers/event.js";
import {users,posts} from './data/index.js'

// const cookie = require('cookie');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'event-cloud', 
  api_key: '357864655947295', 
  api_secret:'2IXMS3-rLSmKudQvvTFfLU8c5SU' 
});

// app.get('/set-cookie', (req, res) => {
//   const sameSiteCookie = cookie.serialize('myCookie', 'myValue', {
//     sameSite: 'None',
//     secure: true, // Requires HTTPS
//   });
//   res.setHeader('Set-Cookie', sameSiteCookie);
//   res.send('Cookie set with SameSite=None; Secure');
// });

/* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });
//   const upload = multer({ storage });
  
  /* ROUTES WITH FILES */
  app.post("/auth/register", register);
  app.post("/posts", verifyToken, createPost);  
  // app.post("/posts", verifyToken, upload.single("picture"), createPost);  
  // app.post("/event/api/submit",submitFormData);


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/event",router);

  /* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users); 
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));