import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { express } from "express";

const app=express();

app.use(cors({
origin:process.nextTick.CROS_ORIGIN,
Credential:true
}))
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("Public"));
app.use(cookieParser());

//rouet import

import {userRouter} from "./routes/user.rotes.js"

//routes decalaration

app.use("api/users",userRouter);


export {app};