import mongoose from "mongoose";
import { Comment } from "../models/comment.models";
import { Apierror } from "../utils/errorHandler";
import { ApiResponse } from "../utils/Apiresponse";
import { asyncHandler } from "../utils/asynhandler";
import { User } from "../models/userModule";
// import { Router } from "express";
const get_comment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.body;
})

const addcomment = asyncHandler(async (req, res) => {
    const {email,password, content } = req.body;
    const exit = await User.findOne({
        $or: [{ email }, { password }]
    })
    if (!exit) {
        throw new Apierror(400, "you are not register");
    }
    if (!content) {
        throw new Apierror("please enter your content");
    }
    const user_content = await Comment.create({
        content
    });
    if (!user_content) {
        throw new Apierror(500, "something went wrong");
    }
    return res.status(201).json(
        new ApiResponse(201, user_content, "thank you for comments")
    );
})

const update_comment = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        throw new Apierror(400, "enter your email and password");
    }
    const exit = await User.findOne({
        $or: [{ email }, { password }]
    })
    if (!exit) {
        throw new Apierror(400, "you are not register");
    }
    const comment = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                content
            }
        }, {
        new: true,//return update value automatically
    })
        .select("-password");

    return res.status(200).json(
        new ApiResponse(200, comment, "your comment successfully update")
    );
})

const deletecomment=asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    if (!email && !password) {
        throw new Apierror(400, "enter your email and password");
    }
    const exit = await User.findOne({
        $or: [{ email }, { password }]
    })
    if (!exit) {
        throw new Apierror(400, "you are not register");
    }
    const delete_comment=await User.findByIdAndDelete(req.user?._id,
    {
      $set:{
             content:undefined
      }
    },{
        new:true,
    })
   return res.status(201).json(
    new ApiResponse(200,{},"your is now deleted")
   );
})

export{
    get_comment,
    addcomment,
    update_comment,
    deletecomment,
}