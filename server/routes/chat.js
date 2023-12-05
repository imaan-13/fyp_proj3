import express from "express";
import { accessChat,fetchChats } from "../controllers/chat.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.post('/:userId/:friendId',verifyToken,accessChat);
router.get('/:userId',verifyToken, fetchChats);

export default router;
