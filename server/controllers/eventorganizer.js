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