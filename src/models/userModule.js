import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        index:true,
        lowercase:true
    },
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        index:true
    },
    fullname:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloudinary url ke liye
        require:true
    },
    coverImage:{
        type:String,//cloudinary url
    },
    watchHistory:[{//ise hum ne object banaya hai kyu ki
        //hum isme data store karte jayenge
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        require:true
    },
    refreshToken:{
        typr:String
    }

},{
    timestamps:true
})

export const User=mongoose.model("User",userSchema);