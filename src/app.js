import cookieParser from "cookie-parser";
import cors from "cors";
import express  from "express";

const app=express();

app.use(cors({
origin:process.nextTick.CORS_ORIGIN,
Credentials:true
}))
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("public/text"));
app.use(cookieParser());

//rouet import

import userRouter from "./routes/user.routes.js"

import comment from "./routes/comment.routes.js";

//routes decalaration

app.use("/api/users",userRouter);
app.use("/api/users",comment)
console.log("hello");

export {app};
