import express  from "express";
import { verifyToken } from "../middleWare/middleWare.js";

import {getFeedPost , getUserPost, likedPost , addComments} from "../contollers/post.js"



const router = express.Router();

router.get("/" , verifyToken,getFeedPost)
router.get("/:userId/posts", verifyToken,getUserPost)

router.patch("/:id/like", verifyToken,likedPost);
router.patch('/:postId/comment', verifyToken, addComments)

export default router;
