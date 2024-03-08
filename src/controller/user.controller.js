import { asyncHandler } from "../utils/asynhandler.js";
import { Apierror } from "../utils/errorHandler.js";
import { User } from "../models/userModule.js";
import { uploadCloudinary } from "../utils/clodinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { Jwt } from "jsonwebtoken";

const generate_token = async (exit_userId) => {

  try {
    const user = await User.findById(exit_userId);
    console.log("hello");
    console.log("User found:", user);
    const accessToken = await user.generateAccessToken();

    console.log("ban gaya bhai access token ye raha:", accessToken);
    const refreshToken = await user.generateRefreshToken();
    console.log("Refresh token  bhi bangaya", refreshToken);
    user.refreshToken = refreshToken;
    await user.save({ ValidateBeforeSave: false })//means validate kar do agr hum ye nhi likha te to bo validation mangata
    //to hame use password dena padta 

    return { accessToken, refreshToken };
  }
  catch (error) {
    console.log("real error:", error)
    throw new Apierror(500, "something went wrong");
  }

}

const registration = asyncHandler(async (req, res) => {
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

  const { fullName, username, email, password } = req.body;
  console.log("email :", email);

  if (
    [fullName, password, email, username].some((field) =>
      field?.trim() === "")
  ) {
    throw new Apierror(400, "all information is required")
  }
  //ab karenge validtion

  const exitingUser = await User.findOne({
    $or: [{ username }, { email }]//or ki takarah or kuch bhi use kar sakte hai but hum ak se jada chiz chate hai isliye
    //or use kar rhe
  })
  // console.log(exitingUser);
  if (exitingUser) {
    throw new Apierror(409, "this username and email is already register");
  }
  //path kyu ki abhi ye locally avabival hai cloud pe nhi hai ye
  const avatarLocalPath = req.files["avatar"][0]?.path;
  // const coverImageLocalPath = req.files["coverImage"][0]?.path;//ye jab chahiye hota jab hume cumpalsory coverimage
  //chahiye  uske bina age proceed nhi hoga

  //but hame to choice mai chahiye so
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  console.log(avatarLocalPath)
  console.log(coverImageLocalPath)
  if (!avatarLocalPath) {
    throw new Apierror(400, "avatar file is required")
  }

  const avatar = await uploadCloudinary(avatarLocalPath)
  const coverImage = await uploadCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new Apierror(400, "avatar file is required")
  }

  //now time to save the data
  //ab bus user hi baat kar rha mongo se to bo hi create karega

  const user = await User.create(
    {
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    }
  )
  console.log(user);

  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  )//isme by default sab select hote hai bus -ve sign bata ta hai ki ye response mat do
  //bicha mai space karte hai or chiz likhane ke liye

  if (!createduser) {
    throw new Apierror(500, "something went wrong during registration");
  }

  return res.status(201).json(
    new ApiResponse(200, createduser, "user created successfully")
  )

})

const loginUser = asyncHandler(async (req, res) => {
  //req body
  //username ,email
  //if user exit check password
  //access and refresh token
  //send secure cookies,res u register successfully

  const { username, email, password } = req.body;
  if (!(email || username)) {
    throw new Apierror(400, "username and email is required");
  }
  const exit_user = await User.findOne({
    $or: [{ username }, { email }]
  })

  if (!exit_user) {
    throw new Apierror(400, "user is not register then go and register first")
  }

  const isPasswordValid = await exit_user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new Apierror(401, "password is incorrect")
  }

  const { accessToken, refreshToken } = await generate_token(exit_user._id);

  const loggedinUser = await User.findById(exit_user._id).select("-password -refreshToken");
  const option =
  {
    httpOnly: true,//ise cookies modified nhi hogi frontend se
    //secure true kar ne se hum means sirf server modified kar sakta hai
    secure: true
  }

  return res.status(200)
    .cookie("Access_token", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(200, {
        user: loggedinUser,
        accessToken, // Correct variable name
        refreshToken // Correct variable name
        //ye cookie se bhi bhej rhe the but mai isliye alg se bhej rha hu
        //kyu ki pata nhi user locaaly use store karna chahai 
      },
        "User logging in successfully"
      )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  )

  const option =
  {
    httpOnly: true,//ise cookies modified nhi hogi frontend se
    //secure true kar ne se hum means sirf server modified kar sakta hai
    secure: true
  }

  return res.status(200)
    .clearCookie("Access_token", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "user logged out"))

})

const Refresh_tokengen = asyncHandler(async (req, res) => {

  try {
    const incoming_token = req.cookie.refreshToken || req.body.refreshToken;
    if (!incoming_token)
      throw new Apierror(401, "unauthorised excess")
    //ab verify karenge
    const decoded_token = Jwt.verify(
      incoming_token, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded_token?._id)
    if (!user) {
      throw new Apierror(400, "invalid user");
    }
    if (incoming_token !== user?.refreshToken)
      throw new Apierror(401, "refresh token is expired")
  

const option = {
  httpOnly: true,
  secure: true
}

const { access, refresh } = await generate_token(user._id)

return res
  .cookie("Access_token", access, option)
  .cookie("refreshToken", refresh, option)
  .json(
    new ApiResponse(
      200,
      {
        access,refresh
      },
      "token is successfully refresh "
    )
  )
   }catch (error) {
    console.log("ye rha error",error)
  throw new Apierror(402, "refresh token generation their is an error")}
})
export {
  registration,
  loginUser,
  logoutUser,
  Refresh_tokengen
};
