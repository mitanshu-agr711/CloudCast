import mongoose from "mongoose";

const subs_Schema=new mongoose.Schema(
    {
       Subscriber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       },
       Channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       }
       
    },
    {
        timestamps:true
    }
)

export const subscription=mongoose.models("subscription", subs_Schema);