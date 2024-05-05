import { Router } from "express";

import{
    addcomment,
    update_comment,
    // deletecomment,
    get_comment
} from "../controller/comment.controller.js"

import { VerifyJwToken } from "../middleware/auth.middleware.js";

const router=Router();


router.use(VerifyJwToken);

router.route("/comment").post(addcomment);
router.route("/c/:getvideo").get(get_comment);
router.route("/updatecomment").patch(update_comment);
// router.route("/deletecomment").delete(deletecomment);

export default router

