import { Router } from "express";
import {loginUser, logoutUser, registration} from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { VerifyJwToken } from "../middleware/auth.middleware.js";

const router=Router();

router.route("/register").post
(
    upload.fields(
        [
            {
                name:"avatar",
                maxCount:1
            },
            {
                name:"coverImage",
                maxCount:1
            }
        ]),
    registration)

router.route("/login").post(loginUser)

//secure route
router.route("logout").post(VerifyJwToken,logoutUser) //verifyjwt kha rha phele mera kam karo jab kam hogya to fun mai jo next
//hai bo kha rha ab logoutUser pe pahucho

export default router //default means import ke bakat man chsaha name desakte ho