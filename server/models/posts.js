// import mongoose, { isValidObjectId } from "mongoose";

// const postSchema = mongoose.Schema(
  
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     location: String,
//     description: String,
//     // communities: String,
//     picturePath: String,
//     userPicturePath: String,
//     // likes: [{
//     //   // type: isValidObjectId,
//     //   // ref:"User",
//     //   // of: Boolean,
//     //   type:Map,
//     //   of:Boolean,
//     // }],
//     // comments: {
//     //   type: Array,
//     //   default: [],
//     // },
//   },
//   { timestamps: true },
// );

// const Post = mongoose.model("Post", postSchema);

// export default Post;


import mongoose, { isValidObjectId } from "mongoose";
import User from "./User.js";
// import { object } from "yup";
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({

// title:{
//   type:String,
//   // required:true

// },
body:{
  type:String,
  required:true
},

photo:{
  type:String,
  // default:"no photo"
},
postedBy:{
  
  type:ObjectId,
  ref:"User"
  
},

name:{
  type:String
},

userPhoto:{
  type:String

}
,

// likes:[{type:ObjectId, ref:"user"}]
likes:{
  type:Array,
  default:[]
}
,
community:{
  type:String,
  // required:true
}


})

const Post = mongoose.model("Post", postSchema);

export default Post;