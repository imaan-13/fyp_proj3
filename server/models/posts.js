import mongoose, { isValidObjectId } from "mongoose";

const postSchema = mongoose.Schema(
  
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    // communities: String,
    picturePath: String,
    userPicturePath: String,
    likes: [{
      // type: isValidObjectId,
      // ref:"User",
      // of: Boolean,
      type:Map,
      of:Boolean,
    }],
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
