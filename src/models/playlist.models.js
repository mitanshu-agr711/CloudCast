import mongoose from "mongoose";

const PlaylistSchema=new mongoose.Schema(
    {
       name:{
        type:String,
        required:true
       },
       description:{
        type:String,
        require:true
       },
       videos:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
       },
       owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     }
    },
    {
        timestamps:true
    }
)

export const Playlist=mongoose.model("Playlist",PlaylistSchema)