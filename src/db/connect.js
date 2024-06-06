import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";
dotenv.config();
console.log(`${process.env.MONGODB_URL}/${DB_NAME}`)

const connectDB=async()=>{
    try {
      const connectionInstant=  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`\n MONGO_DB HOSTED ${connectionInstant.connection.host}`);//agr sirf hum {connection likha to hame sirf object mila}
    } catch (error) {
        console.log("Mongo db connection FAILED",error);
        throw Error(error.message);
    }
}

export default connectDB;