import express from "express";


import Conversation from "../modles/chat.js";



const router = express.Router();



router.post('/', async (req, res) => {
    const { senderId, receiverId } = req.body;

    // Check if conversation already exists
    try {
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (conversation) {
            return res.status(200).json(conversation); // If conversation exists, return it
        }

        // If conversation does not exist, create a new one
        const newConversation = new Conversation({
            members: [senderId, receiverId],
        });

        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        console.log("Conversations found:", conversation);
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router