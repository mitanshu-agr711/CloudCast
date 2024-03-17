import { Router } from "express";
import {
    loginUser, logoutUser, registration, Refresh_tokengen, changeCurrentPassword,
    getCurrentUser,
    Update_Account,
    Update_Avatar,
    Update_Coverimage,
    getChannelProfile,
    getHistory
} from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { VerifyJwToken } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post
    (
        upload.fields(
            [
                {
                    name: "avatar",
                    maxCount: 1
                },
                {
                    name: "coverImage",
                    maxCount: 1
                }
            ]),
        registration)

router.route("/login").post(loginUser)

//secure route
router.route("/logout").post(VerifyJwToken, logoutUser) //verifyjwt kha rha phele mera kam karo jab kam hogya to fun mai jo next
//hai bo kha rha ab logoutUser pe pahucho

router.route("/refresh-token").post(Refresh_tokengen)

router.route("/changePassword").post(VerifyJwToken, changeCurrentPassword)

router.route("/currentUser").get(VerifyJwToken, getCurrentUser)

router.route("/Update-Account").patch(VerifyJwToken, Update_Account)//patch use becz we only change account

router.route("/update_Avatar").patch(VerifyJwToken, upload.single("avatar"), Update_Avatar)//jo braket mai likha hai bo uska name hai

router.route("/cover-image").patch(VerifyJwToken, upload.single("coverImage"), Update_Coverimage)

router.route("/c/:username").get(VerifyJwToken, getChannelProfile)//params use kiya isliye /c/:

router.route("/History").get(VerifyJwToken, getHistory)

export default router //default means import ke bakat man chsaha name desakte ho