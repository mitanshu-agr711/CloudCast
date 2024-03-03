import { Router } from "express";
import {registration} from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";


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
                name:"coverimage",
                maxCount:1
            }
        ]),
    registration)

export default router //default means import ke bakat man chsaha name desakte ho