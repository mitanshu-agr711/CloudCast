import mongoose from "mongoose";
import { Video } from "../models/videoModule.js"
import { ApiResponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asynhandler.js";
import { uploadCloudinary } from "../utils/clodinary.js";
import { User } from "../models/userModule.js";
const getAllvideo=asyncHandler(async(req,res)=>
{
    try {
        const {query,sortType, userId } = req.query
        const User=await User.findById(userId);

        let page=Number(req.query.page)||1;
        let limit=Number(req.query.limit)||5;

        let skip=(page-1)*limit;

        const search=await Video.find(query);
        console.log("search",search);

        if(!User)
            {
                throw new Apierror(404,"you are not register");
            }
        if(sortType==='assending')
            {
                var titlename=await title.find({}).sort({title:1});
            }
            else{
                var titlename=await title.find({}).sort({title:-1});       
            }
        res.status(200).json(
            new ApiResponse(200,
                {
                    titlename,search,skip
                },
                "now your data is sorted now and you easily skip pages"
            )
        )
    } catch (error) {
        console.log("video error",error);
    }

})

const publishAVideo = asyncHandler(async (req, res) => {
   try {
     const { title, description,duration } = req.body
     if (!title && !description) {
         throw new Apierror(404, "give title and add some information about video");
     }
    //  console.log(req.files);
     const Videolocalpath = req.files?.["videoFile"][0]?.path;
     console.log(Videolocalpath);
     const videoFile = await uploadCloudinary(Videolocalpath);
//   console.log(videoFile);
     if (!videoFile) {
         throw new Apierror(404, "video is not upload");
     }
     const thumbnaillocal=req.files["thumbnail"][0]?.path;
    //  console.log(thumbnail);
     const thumbnail =await uploadCloudinary(thumbnaillocal);
     if(!thumbnail)
         {
             throw new Apierror(404,"we can not get thumbnail");
         }
 
     const video_detail = await Video.create
         ({
             videoFile: videoFile.url,
             thumbnail: thumbnail.url,
             title,
             description,duration
         }
         )
     if (!video_detail) {
         throw new Apierror(404, "something went wrong");
     }
     return res.status(202).json
         (
             new ApiResponse(202, video_detail, "video upload successfully")
         )
   } catch (error) {
    console.log("video error ",error)
   }
})

const getVideoById=asyncHandler(async(req,res)=>{
    const {getVideoById}=req.params

    if(!getVideoById)
        {
            throw new Apierror(404,"not found video");
        }

        return res.status(200).json(
            new ApiResponse(200,getVideoById,"video successfully fatched")
        )
})

const deleteVideo=asyncHandler(async(req,res)=>{
    const {title}=req.body
    const deleteVideo=await uploadCloudinary.destroy(title);
    if(deleteVideo.result!=='ok')
        {
            throw new Apierror(410,"error in deleting video");
        }
        return res.status(205).json(
            205,{},"your video successfully deleted"
        )
})

export
{
    getAllvideo,
    publishAVideo,
    getVideoById,
    deleteVideo
}