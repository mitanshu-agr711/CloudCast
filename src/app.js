import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { express } from "express";

const app=express();

app.use(cros({
origin:process.nextTick.CROS_ORIGIN,
Credential:true
}))
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("Public"));
app.use(cookieParser());



export {app};