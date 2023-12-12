import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const editProfileUser = async (req, res) => {
  try {
   
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
      _id
      // likedPosts,
    } = req.body;

    // Assuming you have some way to authenticate the user, you can get their user ID
  
    console.log(firstName,
      lastName,
      email,
      // password,
      picturePath,
      location,
      occupation,
      _id);
    // Check if the user exists
    const existingUser = await User.findById(_id);
      // console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.email = email;
    existingUser.picturePath = picturePath;
    
    existingUser.location = location;
    existingUser.occupation = occupation;

    // Check if the password needs to be updated
    // if (password) {
    //   const salt = await bcrypt.genSalt();
    //   const passwordHash = await bcrypt.hash(password, salt);
    //   existingUser.password = passwordHash;
    // }

    // Save the updated user profile
    // console.log(existingUser);
    const updatedUser = await existingUser.save();
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// export const getUserFriends = async (req,res)=>{

 

//   // const post = await Post.findById(postId);
//   // const postId = req.params.id;
//   const { id } = req.params;
//   try {
//     // const {postId}=req.body;
//     const post = await User.findById(id);

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     // Retrieve the likes from the post object and send them in the response
//     const friends = post.friends;
//     res.json( {friends} );

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }




/* UPDATE */
// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.body;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };


export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.body;

    const post = await User.findById(id);
    const post2=await User.findById(friendId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userLikedIndex = post.friends.findIndex(likedUserId => likedUserId.toString() === friendId);
    const userLikedIndex2 = post2.friends.findIndex(likedUserId2 => likedUserId2.toString() === id);

    if (userLikedIndex === -1 && userLikedIndex2===-1) {
      // User hasn't liked the post, add user to likes array
      post.friends.push(friendId);
      post2.friends.push(id);
      // res.json({likes});
    } else {
      // User has liked the post, remove user from likes array
      post.friends.splice(userLikedIndex, 1);
      post2.friends.splice(userLikedIndex2, 1);
      // res.json({likes});
    }

    const result = await post.save();
    const result2=await post2.save();


    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// export const Location= async (req, res) => {
//   const { username } = req.params;

//   try {
//     const user = await User.findOne({ username });
//     const nearbyUsers = await User.find({
//       location: {
//         $near: {
//           $geometry: {
//             type: 'Point',
//             coordinates: user.location.coordinates,
//           },
//           $maxDistance: 10000, // Adjust the maximum distance as needed (in meters)
//         },
//       },
//     });
    
//     res.json({ success: true, nearbyUsers });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };



// export const setLocation= async (req, res) => {
//   const {  coordinates } = req.body;
//   const {userId}=req.params;
  
//   try {
//     // await User.updateOne({ username }, { $set: { location: { coordinates } } });
//     // await User.updateOne(
//     //   { username },
//     //   { $set: { location: { type: 'Point', coordinates: coordinates } } }
//     await User.findByIdAndUpdate(
//       userId,
//       { $set: { location2: { type: 'Point', coordinates: coordinates } } },
//       { new: true } // This option returns the modified document instead of the original
//     );
  
//     res.json({ coordinates });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };



export const saveCoordinates = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    console.log(userId, latitude,longitude);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(userId, latitude,longitude);
    // Update the user's location coordinates
    user.latitude = latitude;
    user.longitude = longitude;

    
    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: 'Coordinates saved successfully' });
  } catch (error) {
    console.error('Error saving coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};