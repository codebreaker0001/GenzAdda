import express from "express";

import{
    getUser,
    getUserFriends,
    addRemoveFriends,
} from "../contollers/user.js"

import { verifyToken } from "../middleWare/middleWare.js";import { format } from "path";


const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser);

router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;