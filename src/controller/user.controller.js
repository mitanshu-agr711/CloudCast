import {asyncHandler} from "../utils/asynhandler.js";
import { Apierror } from "../utils/errorHandler.js";
import {User} from "../models/userModule.js";
import { uploadCloudinary } from "../utils/clodinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const registration=asyncHandler(async(req,res)=>{
  //get details from frontent
  //validation
  //not empty
  //check if user is already exit or not by usernamw and email
  //avtar and image upload to cloudinary,avatar
  //create user object
  //crete db
  //remove password and respond token field
  //check user creation
  //return response

  const {fullName,username,email,password}=req.body;
  console.log("email :", email);
    
  if(
    [fullName,password,email,username].some((field)=>
        field?.trim()==="")
    )
    {
        throw new Apierror(400,"all information is required")
    }
  //ab karenge validtion

  const exitingUser=await User.findOne({
    $or:[ { username}, {email}]//or ki takarah or kuch bhi use kar sakte hai but hum ak se jada chiz chate hai isliye
    //or use kar rhe
  })
  // console.log(exitingUser);
  if(exitingUser)
  {
    throw new Apierror(409,"this username and email is already register");
  }
//path kyu ki abhi ye locally avabival hai cloud pe nhi hai ye
  const avatarLocalPath = req.files["avatar"][0]?.path;
  // const coverImageLocalPath = req.files["coverImage"][0]?.path;//ye jab chahiye hota jab hume cumpalsory coverimage
  //chahiye  uske bina age proceed nhi hoga

  //but hame to choice mai chahiye so
  let coverImageLocalPath;
  if(req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0)
  {
     coverImageLocalPath=req.files.coverImage[0].path;
  }
  
 console.log(avatarLocalPath)
 console.log(coverImageLocalPath)
  if(!avatarLocalPath)
  {
    throw new Apierror(400,"avatar file is required")
  }

 const avatar= await uploadCloudinary(avatarLocalPath)
 const coverImage=await uploadCloudinary(coverImageLocalPath);

 if(!avatar)
 {
   throw new Apierror(400,"avatar file is required")
 }

 //now time to save the data
 //ab bus user hi baat kar rha mongo se to bo hi create karega

 const user=await User.create(
    {
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    }
 )
 console.log(user);

 const createduser=await User.findById(user._id).select(
    "-password -refreshToken"
 )//isme by default sab select hote hai bus -ve sign bata ta hai ki ye response mat do
 //bicha mai space karte hai or chiz likhane ke liye

 if(!createduser)
 {
    throw new Apierror(500,"something went wrong during registration");
 }

return res.status(201).json(
    new ApiResponse(200,createduser,"user created successfully")
)

})

export {registration};