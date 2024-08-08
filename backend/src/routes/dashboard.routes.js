import { Router } from "express";
import { getChannelStatsTotalLikes, getChannelStatsTotalSubscriber, getChannelStatsTotalVideos, getChannelVideos } from "../controllers/dashboard.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()
router.use(verifyJWT)
router.route("/dashboard/totallikes").get(getChannelStatsTotalLikes)
router.route("/dashboard/totalvideos").get(getChannelStatsTotalVideos)
router.route("/dashboard/totalsubs").get(getChannelStatsTotalSubscriber)
router.route("/dashboard/videos").get(getChannelVideos)
export default router