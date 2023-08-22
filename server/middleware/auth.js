import { PlaylistAddOutlined } from "@mui/icons-material";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    const {_id}=verified
    User.findById(_id).then(userdate=>{
      req.user=userdate
      next();
    })
    // next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
