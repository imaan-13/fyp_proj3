import express from "express";
import { communityPost, getFeedPosts, getUserPosts,likesPost,postLikes} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


/* UPDATE */
// router.patch("/:id/like", verifyToken, likePost);
router.put("/:id/like",verifyToken,likesPost)
router.get("/:id",verifyToken,postLikes)
router.post("/community",verifyToken,communityPost)
// router.put("/:id/unlike",verifyToken,unlikesPost)
export default router;
