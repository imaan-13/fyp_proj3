import Event from '../models/Events.js';
import User from '../models/User.js';
// const FormDataModel = require('../models/Events');

export const submitFormData = async (req, res) => {
    const {
        eventName,
        startDate,
        locationLongitude,
        locationLangitude,
        startTime,
        locationType,
        details,
        contact,
        community,
        postedBy,
        address,
        } = req.body;
        const postuser=await User.findById(postedBy)
    try {
        const newFormData = new Event({
            eventName,
            startDate,
            // startTiming,
            startTime,
            locationType,
            details,
            contact,
            community,
            postedBy,
            userPhoto:postuser.picturePath,
            name:postuser.firstName+" "+postuser.lastName,
            address,
            locationLangitude,
            locationLongitude,
            
            });
        await newFormData.save();
        res.status(201).json(newFormData);
    } catch (error) {
      console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// module.exports = {
//     submitFormData,
// };

export const fetchEventPosts = async (req, res) => {
  
    const post = await Event.find()
    // .populate("postedBy")
    .then(posts=>{
      res.json(posts)
    })
    .catch(err=>{
      console.log(err)
    })
 
};

// export const fetchEventPosts = async (req, res) => {
//   try {
//     const posts = await Event.find().select('eventName startDate startTime locationType details contact community likes saved');

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


  
export const likesPost = async (req, res) => {
    try {
      const { postId, userId } = req.body;
  
      const post = await Event.findById(postId);
  
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
      const post = await Event.findById(id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Retrieve the likes from the post object and send them in the response
      const likes = post.likes;
      const saved = post.saved;
      res.json({ likes,saved });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

    
export const savePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Event.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userLikedIndex = post.saved.findIndex(likedUserId => likedUserId.toString() === userId);

    if (userLikedIndex === -1) {
      // User hasn't liked the post, add user to likes array
      post.saved.push(userId);
      // res.json({likes});
    } else {
      // User has liked the post, remove user from likes array
      post.saved.splice(userLikedIndex, 1);
      // res.json({likes});
    }

    const result = await post.save();

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const communityPost = async (req, res) => {
  try {
    const { community } = req.body;

    // Find posts that match the specified "community" value
    const posts = await Event.find({ community });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Import necessary modules and models
// const Post = require('./models/Post'); // Import your Post model

// Define the route handler for fetching saved posts
export const fetchSavedPosts = async (req, res) => {
  try {
    const {userId} = req.body; // Assuming you have user information in req.user

    // Find posts where the user's ID is in the "saved" array
    const savedPosts = await Event.find({ saved: { $in: [userId] } });

    res.json(savedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Helper function to calculate the distance between two sets of coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};


export const filterEventsByRadius = async (req,res) => {

  try {
    // Fetch the user's location coordinates
    const {userId,selectedRadius}=req.body
    const user = await User.findById(userId);

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ error: 'User not found' });
    }
    const userLatitude = user.latitude;
    const userLongitude = user.longitude;
    // console.log(user);
    // Fetch all events
    const events = await Event.find();

    // Filter events based on distance from the user's location
    const filteredEvents = events.filter(event => {
      const eventLatitude = event.locationLangitude; // Note: Corrected the field name from locationLangitude to locationLatitude
      const eventLongitude = event.locationLongitude;

      // Calculate the distance between the user and the event
      const distance = calculateDistance(userLatitude, userLongitude, eventLatitude, eventLongitude);
      console.log("DISTANCE,",distance);
      // Check if the distance is within the selected radius
      return distance <= selectedRadius;
    });
    console.log(filteredEvents)
    res.json({ filteredEvents,userLatitude,userLongitude });
  } catch (error) {
    console.error('Error filtering events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};