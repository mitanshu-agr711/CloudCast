import  express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDB from "./db/connect.js";
const app=express();
// app.use(express.json());

// 
import dotenv from "dotenv";
dotenv.config();

connectDB()// ye promise return kar rha

.then(()=>{
    console.log("mogodb is connected");
    app.listen(process.env.PORT ||8000,()=>{

console.log(`server is running on port ${process.env.PORT||8000}` )
    })
})
.catch((error)=>{
   console.log("connection is failed",error);
})















//     try {
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("err",error);
//         app.listen(process.env.PORT,()=>
//         {
//             console.log(`your server is running on port : ${process.env.PORT}`);
//         })
//        })

//     } catch (error) {
//         console.log(`error `,error);
//     }
// })()
