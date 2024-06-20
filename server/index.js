import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import helmet from 'helmet'
import cors from "cors"
import multer from 'multer'
import { fileURLToPath } from 'url'
import { configDotenv } from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { log } from 'console'
import { register } from './contollers/auth.js'
import { verifyToken } from './middleWare/middleWare.js'
import { createPost } from './contollers/post.js'
import User from './modles/user.js'
import Post from './modles/posts.js'
import {users,posts} from './data/index.js'

import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/post.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


configDotenv();

const app = express();

app.use(express.json());

app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));

app.use(morgan("common"));

app.use(bodyParser.json({limit:"30mb", extended : "true"}))
app.use(bodyParser.urlencoded({limit:"30mb", extended : "true"}))

// const corsOption = {
//     origin:"http://localhost:5173",
//     credentials:true,
//     methods:["GET","POST","PUT","DELETE","PATCH"],
//     // allowedHeaders:["Content-Type","Authorization"]
// }

app.use(cors());

app.use("/assets" , express.static(path.join(__dirname,'public/assets')))

const storage  = multer.diskStorage({
    destination:function (req,file ,cb){
        cb(null,"public/assets");
    },

    filename:function (req,file ,cb){
        cb(null, file.originalname);
    }

})

const upload = multer({storage})


// Routes with files

app.post("/auth/register" , upload.single("picture") , register)
app.post("/posts", verifyToken , upload.single("picture") , createPost)


// Routes

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

// mongoose setup 

const PORT = process.env.PORT;

console.log(PORT);
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL).then(() =>{
    app.listen(PORT,() => console.log(`Server PORT: ${PORT}  `))
    // User.insertMany(users)
    // Post.insertMany(posts)
}).catch((err)  => console.log(`${err} Not Connected`))



 
 
