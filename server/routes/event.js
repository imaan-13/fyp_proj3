import { submitFormData , fetchEventPosts,likesPost,postLikes, savePost,communityPost,fetchSavedPosts,filterEventsByRadius} from "../controllers/event.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// const formController = require('./controllers/formController');
router.post('/api/submit', submitFormData);

router.get('/',verifyToken,fetchEventPosts);
router.put("/:id/like",verifyToken,likesPost)
router.put("/:id/save",verifyToken,savePost)
router.get("/:id",verifyToken,postLikes)
router.post("/community",verifyToken,communityPost)
router.post("/saved-posts",verifyToken,fetchSavedPosts)
router.post("/events-nearby",filterEventsByRadius)
export default router;