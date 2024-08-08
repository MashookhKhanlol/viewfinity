import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylist, removeVideoFromPlaylist, updatePlaylist} from '../controllers/playlist.controller.js'
const router = Router()

router.use(verifyJWT)

router.route("/createplaylist").post(createPlaylist)
router.route("/updateplaylist/u/:playlistId").patch(updatePlaylist)
router.route("/deleteplaylist/d/:playlistId").delete(deletePlaylist)
router.route("getplaylistbyid/:playlistId").get(getPlaylistById)
router.route("/user/:userId").get(getUserPlaylist)
// router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist)
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist)
export default router