import mongoose from "mongoose";
import { Comment } from "../models/comment.models";
 import { Apierror } from "../utils/errorHandler";
 import { ApiResponse } from "../utils/Apiresponse";
 import { asyncHandler } from "../utils/asynhandler";

 const comment=asyncHandler(async(req,res)=>{
    const{videoId}=req.params;
    const{page=1,limit=10}=req.body;
 })

 const addcomment=asyncHandler(async(req,res)=>{
    
 })