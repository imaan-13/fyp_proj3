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
      // .populate("postedBy")
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

// export const createPost = async (req, res) => {
  
//     const { postedBy,body,photo,userPhoto,community}=req.body;
//     // const { id } = req.params;
//     // console.log(id);
//     // const user = await User.findById(id);

//     if(!body){
//       return res.status(422).json({error:"Please add text fields"})

//     }
//     // req.User.password=undefined;

//     const post=new Post({
//       body,
//       postedBy,
//       photo,
//       userPhoto,
//       community,
//     })

//     post.save().then(result=>{
//       res.json({post:result})
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   };

  export const createPost = async (req, res) => {
  
    const { body,photo,community,postedBy}=req.body;
 
    const postuser=await User.findById(postedBy)
    if(!body&&!community){
      return res.status(422).json({error:"Please add text fields"})

    }
    // req.User.password=undefined;

    const post=new Post({
      body,
      postedBy:postuser,
      photo,
      userPhoto:postuser.picturePath,
      name:postuser.firstName+" "+postuser.lastName,
      community,
    })

    post.save().then(  result=>{
     
     

         res.json({
            post:result
         });
    


  })
    .catch(err=>{
      console.log(err)
    })
  };

 

  // export const getUserPosts = async (req, res) => {

  //   // const postuser=await User.findById(postedBy);
  //   console.log(req.params.userId);
  //    const mypost=await Post.find(
  //     {postedBy:req.params.userId})
     
  //     .populate("postedBy","_id name" )
  //     .then(mypost=>{
  //       res.json({mypost})
  //     })
  //     .catch(err=>{
  //       console.log(err)
  //     })
  //   };


  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;

      const posts = await Post.find({
        postedBy: userId
      });
  
      res.json( posts );
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  
  export const likesPost = async (req, res) => {
    try {
      const { postId, userId } = req.body;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const userLikedIndex = post.likes.findIndex(likedUserId => likedUserId.toString() === userId);
  
      if (userLikedIndex === -1) {
        // User hasn't liked the post, add user to likes array
        post.likes.push(userId);
        // res.json({likes});
      } else {
        // User has liked the post, remove user from likes array
        post.likes.splice(userLikedIndex, 1);
        // res.json({likes});
      }
  
      const result = await post.save();
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  export const postLikes = async (req,res)=>{

 

    // const post = await Post.findById(postId);
    // const postId = req.params.id;
    const { id } = req.params;
    try {
      // const {postId}=req.body;
      const post = await Post.findById(id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Retrieve the likes from the post object and send them in the response
      const likes = post.likes;
      res.json({ likes });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  //  export const unlikesPost=async (req,res) =>{
  //   Post.findByIdAndUpdate(req.body.postId,{
  //     $pull:{likes:req.user._id}
  //   },{
  //     new:true
  //   }).exec((err,result)=>{
  //       if(err){
  //         return res.status(422).json({error:err})
  //       }
  //       else{
  //         res.json(result)
  //       }
  //   })
  //  }
 
  export const communityPost = async (req, res) => {
    try {
      const { community } = req.body;
  
      // Find posts that match the specified "community" value
      const posts = await Post.find({ community });
  
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  

  // export const communityPost = async (req, res) => {
  //   try {
  //     const specificCommunity = "Education";
      
  //     const posts = await Post.aggregate([
  //       { $match: { community: specificCommunity } }
  //     ]);
  
  //     res.json(posts);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
  