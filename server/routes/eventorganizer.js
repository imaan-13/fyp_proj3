// import { submitFormData , fetchEventPosts,likesPost,postLikes, savePost,communityPost,fetchSavedPosts} from "../controllers/event.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { submitVerification,isVerified } from "../controllers/eventorganizer.js";
const router = express.Router();

// const formController = require('./controllers/formController');
router.post('/verify', submitVerification);
router.get('/verify-status/:userId', isVerified);


export default router;