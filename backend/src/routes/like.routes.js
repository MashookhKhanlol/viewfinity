import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkVideoLiked, getLikedVideos, toggleComment, toggleTweet, toggleVideoLiked } from "../controllers/like.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/toggle/v/:videoId").post(toggleVideoLiked)
router.route("/toggle/c/:commentId").post(toggleComment)
router.route("/toggle/t/:tweetId").post(toggleTweet)
router.route("/videos").get(getLikedVideos)
router.route('./check/v/:videoId').get(checkVideoLiked)

export default router
