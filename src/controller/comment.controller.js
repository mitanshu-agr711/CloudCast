// import mongoose from "mongoose";
import {Comment} from "../models/comment.models.js";
import { Apierror } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asynhandler.js";
import { User } from "../models/userModule.js";
const get_comment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.body;
})

const addcomment = asyncHandler(async (req, res) => {
    console.log("agaya mai yha");
    try {
        const {email,password, content } = req.body;
        const owner = req.user._id; // Assuming req.user._id contains the authenticated user's ID

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
            content,owner
        });
        if (!user_content) {
            throw new Apierror(500, "something went wrong");
        }
        return res.status(201).json(
            new ApiResponse(201, user_content, "thank you for comments")
        );
    } catch (error) {
        console.log("ye rhi error ",error);
    }
})

const update_comment = asyncHandler(async (req, res) => {
    const { email, password,content} = req.body;
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

// const deletecomment=asyncHandler(async(req,res)=>{
//     const { email, password} = req.body;
//     if (!email && !password) {
//         throw new Apierror(400, "enter your email and password");
//     }
//     const exit = await User.findOne({
//         $or: [{ email }, { password }]
//     })
//     if (!exit) {
//         throw new Apierror(400, "you are not register");
//     }
   
// })

export{
    // get_comment,
    addcomment,
    update_comment,
    // deletecomment,
    get_comment
}