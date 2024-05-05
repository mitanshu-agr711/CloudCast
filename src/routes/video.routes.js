import { Router } from "express";
import { getAllvideo, publishAVideo, getVideoById, deleteVideo } from "../controller/video.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { VerifyJwToken } from "../middleware/auth.middleware.js";

const router = Router();

// router.use(VerifyJwToken)

router.route("/getVideo").get(getAllvideo);
router.route("/uploadVideo").post(VerifyJwToken, upload.fields([
    {
        name: "videoFile",
        maxCount: 1,
    },
    {
        name: "thumbnail",
        maxCount: 1,
    }
]), publishAVideo);

router.route("/getVideo").get(getVideoById);
router.route("/deleteVideo").delete(VerifyJwToken, deleteVideo);

export default router;
