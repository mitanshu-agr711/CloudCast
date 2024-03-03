import {asyncHandler} from "../utils/asynhandler.js";

const registration=asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
    console.log("hello");
})

export {registration};