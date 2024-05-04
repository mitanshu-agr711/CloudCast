import { Router } from "express";

import{
    addcomment,
    get_comment,
    update_comment,
    deletecomment
} from "../controller/comment.controller"

import { VerifyJwToken } from "../middleware/auth.middleware";

const router=Router();

Router.use(VerifyJwToken);

router.route("/addcomment").post(addcomment);
router.route("/c/:getvideo").get(get_comment);
router.route("/updatecomment").patch(update_comment);
router.route("/deletecomment").delete(deletecomment);

export default router;

