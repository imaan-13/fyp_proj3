import User from '../models/User.js';
import EventOrganizer from '../models/EventOrganizer.js';
import mongoose from 'mongoose';

export const submitVerification = async (req, res) => {
    const {
      
        user,
        idcardFront,
        idcardBack,
        
        } = req.body;
        const postuser=await User.findById(user)
    try {
        const newFormData = new EventOrganizer({
           
            user:user,
            IDcardBack:idcardBack,
            IDcardFront:idcardFront,
            
            });
        await newFormData.save();
        res.status(201).json(newFormData);
    } catch (error) {
      console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const isVerified= async (req,res)=>{
    try {
        const { userId } = req.params;
        const validUserId = new mongoose.Types.ObjectId(userId);
    
        // Fetch the user from the database based on the userId
        // const user = await EventOrganizer.findById(userId);
        const user = await EventOrganizer.findOne({ user: validUserId });
        console.log("hello",user.user);
        if (!user) {
          return res.status(404).json({ isVerified: false, error: 'User not found' });
      }

      // If the user is found, consider it as verified
      res.status(201).json({ isVerified: true });
    
        // Send the verification status as a response
        // console.log("VERIFIED", {isVerified:user.isVerified})
       

      } catch (error) {
        console.error('Error fetching verification status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}








// Mock database
// export const ratings = async (req, res) => {
//   const { eventOrganizerId, rating } = req.body;

//   try {
//     // Find the EventOrganizer by ID
//     let eventOrganizer = await EventOrganizer.findOne({ user: eventOrganizerId });

//     // If the EventOrganizer doesn't exist, handle accordingly (e.g., send an error response)
//     if (!eventOrganizer) {
//       return res.status(404).json({ error: 'Event Organizer not found' });
//     }

//     // Add the new rating to the existing ratings array
//     eventOrganizer.ratings.push(rating);

//     // Save the EventOrganizer with the new rating
//     await eventOrganizer.save();

//     // Calculate average rating
//     const averageRating =
//       eventOrganizer.ratings.reduce((acc, curr) => acc + curr, 0) /
//       eventOrganizer.ratings.length;

//     res.status(200).json({ averageRating });
//   } catch (error) {
//     console.error('Error rating Event Organizer:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const ratings = async (req, res) => {
  const { eventOrganizerId, userId, rating } = req.body;

  try {
    // Find the EventOrganizer by ID
    let eventOrganizer = await EventOrganizer.findOne({ user: eventOrganizerId });

    // If the EventOrganizer doesn't exist, handle accordingly (e.g., send an error response)
    if (!eventOrganizer) {
      return res.status(404).json({ error: 'Event Organizer not found' });
    }

    // Update or set the rating for the specific user
    // eventOrganizer.ratings[userId] = rating;
    if (eventOrganizer.ratings.has(userId)) {
      // User exists, update the existing rating
      eventOrganizer.ratings.set(userId, rating);
    } else {
      // User doesn't exist, add a new rating
      eventOrganizer.ratings.set(userId, rating);
    }
    // // Save the EventOrganizer with the updated ratings
    await eventOrganizer.save();

    let averageRating=0;
    // Calculate average rating
    const allRatings = Array.from(eventOrganizer.ratings.values());
    console.log(allRatings);
    
    // Check if there are ratings before calculating the average
    if (allRatings.length > 0) {
      // Calculate total rating
      const totalRating = allRatings.reduce((acc, curr) => acc + curr, 0);
      console.log(totalRating);
    
      // Calculate average rating
      averageRating = totalRating / allRatings.length;
      console.log(averageRating);
    } else {
      console.log('No ratings yet.');
    }

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Error rating Event Organizer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getUserRatings = async (req, res) => {
  const { userId, eventOrganizerId } = req.params;

  try {
    // Find the EventOrganizer by ID
    const eventOrganizer = await EventOrganizer.findOne({ user: eventOrganizerId });

    // If the EventOrganizer doesn't exist, handle accordingly (e.g., send an error response)
    if (!eventOrganizer) {
      return res.status(404).json({ error: 'Event Organizer not found' });
    }
    let averageRating="";
    // Calculate average rating
    const allRatings = Array.from(eventOrganizer.ratings.values());
    console.log(allRatings);
    
    // Check if there are ratings before calculating the average
    if (allRatings.length > 0) {
      // Calculate total rating
      const totalRating = allRatings.reduce((acc, curr) => acc + curr, 0);
      console.log(totalRating);
    
      // Calculate average rating
      averageRating = totalRating / allRatings.length;
      console.log(averageRating);
    } else {
      console.log('No ratings yet.');
    }
    // Check if the user has given a rating
    if (eventOrganizer.ratings.has(userId)) {
      const userRating = eventOrganizer.ratings.get(userId);
      res.status(200).json({ userRating, averageRating });
    } else {
      res.status(200).json({ message: 'User has not given a rating to this Event Organizer.' });
    }
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
