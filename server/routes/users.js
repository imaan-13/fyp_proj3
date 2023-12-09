import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  editProfileUser,
  // Location,
  // setLocation,
  saveCoordinates
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.post("/addRemoveFriend",verifyToken,addRemoveFriend);
router.patch("/updateProfile",editProfileUser)
// router.get("/location/:username",Location)
// router.post("/userlocation/:userId",setLocation)

router.post('/coordinates',verifyToken,saveCoordinates);

export default router;
