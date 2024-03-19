import mongoose from "mongoose";

const LikeSchema=new mongoose.Schema(
    {
      video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
      },
      commit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
      },
      likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },

    },
    {
        timestamps:true
    }
)

export const Like=mongoose.model("Like",LikeSchema)