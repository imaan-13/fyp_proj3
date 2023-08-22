// import Post from "../models/posts.js";
// import User from "../models/User.js";

// /* CREATE */
// export const createPost = async (req, res) => {
//   try {
//     const { userId, description, picturePath } = req.body;
//     const user = await User.findById(userId);
//     const newPost = new Post({
//       userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       location: user.location,
//       // communities,
//       description,
//       userPicturePath: user.picturePath,
//       picturePath,
//       // likes: {},
//       // comments: [],
//     });
//     await newPost.save();

//     const post = await Post.find();
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(409).json({ message: err.message });
//   }
// };

// /* READ */
// export const getFeedPosts = async (req, res) => {
//   try {
//     const post = await Post.find();
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserPosts = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const post = await Post.find({ userId });
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// /* UPDATE */
// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId } = req.body;
//     const post = await Post.findById(id);
//     const isLiked = post.likes.get(userId);

//     if (isLiked) {
//       post.likes.delete(userId);
//     } else {
//       post.likes.set(userId, true);
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };



// import Post from "../models/posts.js";
// import User from "../models/User.js";



// export const createPost = async (req, res) => {
//     try {
//       const { userId, description, picturePath } = req.body;
//       const user = await User.findById(userId);
//       const newPost = new Post({
//         userId,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         location: user.location,
//         // communities,
//         description,
//         userPicturePath: user.picturePath,
//         picturePath,
//         likes: {},
//         comments: [],
//       });
//       await newPost.save();
  
//       const post = await Post.find();
//       res.status(201).json(post);
//     } catch (err) {
//       res.status(409).json({ message: err.message });
//     }
//   };



import Post from "../models/posts.js";
import User from "../models/User.js";
import { verifyToken,  } from "../middleware/auth.js";



 export const getFeedPosts = async (req, res) => {
  
      const post = await Post.find()
      .populate("postedBy","_id","firstName","lastName")
      .then(posts=>{
        res.json(posts)
      })
      .catch(err=>{
        console.log(err)
      })
   
  };

  // User.findById(_id).then(userdata=>{
  //   req.user=userdata
  //   next()
  // })

export const createPost = async (req, res) => {
  
    const { postedBy,body}=req.body;
    // const { id } = req.params;
    // console.log(id);
    // const user = await User.findById(id);

    if(!body){
      return res.status(422).json({error:"Please add text fields"})

    }
    // req.User.password=undefined;

    const post=new Post({
      body,
      postedBy
    })

    post.save().then(result=>{
      res.json({post:result})
    })
    .catch(err=>{
      console.log(err)
    })
  };

 

  export const getUserPosts = async (req, res) => {
      Post.find({postedBy:req.user._id})
      .populate("postedBy","_id name" )
      .then(mypost=>{
        res.json({mypost})
      })
      .catch(err=>{
        console.log(err)
      })
    };