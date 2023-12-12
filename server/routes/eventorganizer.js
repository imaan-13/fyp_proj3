// import { submitFormData , fetchEventPosts,likesPost,postLikes, savePost,communityPost,fetchSavedPosts} from "../controllers/event.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { submitVerification,isVerified ,ratings,getUserRatings} from "../controllers/eventorganizer.js";
const router = express.Router();

// const formController = require('./controllers/formController');
router.post('/verify', submitVerification);
router.get('/verify-status/:userId', isVerified);
router.post('/rating',ratings)
router.get('/getRating/:userId/:eventOrganizerId',getUserRatings);

export default router;