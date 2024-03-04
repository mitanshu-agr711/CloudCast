
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDB from "./db/connect.js";
import {app} from "./app.js";
// app.use(express.json());

// 

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





//access token is not save in data base but refresh token can be









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
