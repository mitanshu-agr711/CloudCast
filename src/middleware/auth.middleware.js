import { asyncHandler } from "../utils/asynhandler.js";
import { Apierror } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken"
import {User} from "../models/userModule.js";

export const VerifyJwToken=asyncHandler(async(req,res,next)=>{
   try {
     const token=req.cookies?.Access_token||req.header("Authorization")?.replace("Bearer","")
     //ye  ? isliye lagaya ki kya pata access ho ya na ho prgm run kare bus
     if(!token) {
         throw new Apierror(400,"unautharized access")
     }
     //jwt predefined function
    const decoded_Token=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
   const user= await User.findById(decoded_Token?._id).select("-password  -refreshToken")
    //._id kyu ki mene module mai id ase hi define kiya tha
    if(!user) throw new Apierror(401,"invalid access token")
 
    req.user=user//req.user se hum ak object add kar rhe hai or object hamare user hai jo hum ne upar define kiya
    //req.user mai hum ne pura user hi inject kar liya hai
    next()
   } catch (error) {
    throw new Apierror(401,error?.message||"invalid access token")
    
   }
})