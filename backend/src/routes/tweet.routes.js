import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createTweet, deleteTweet, getAllTweet, getUserTweet, updateTweet} from '../controllers/tweet.controller.js'
const router = Router()

router.use(verifyJWT)

router.route('/tweet').post(createTweet)
router.route("/updatetweet/u/:tweetId").patch(updateTweet)
router.route("/deletetweet/d/:tweetId").delete(deleteTweet)
router.route("/user/:userId").get(getUserTweet)
router.route("/alltweets").get(getAllTweet)
export default router