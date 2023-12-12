import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userEventInteractionSchema = new Schema({
    userID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        
    },
    eventID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
        
    },
    likedEvent: {
        type: Boolean,
       
    },

    SavedEvent:{
        type:Boolean,
    },
    community:{
        type:String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

});

const UserEventInteraction = mongoose.model('UserEventInteraction', userEventInteractionSchema);
export default UserEventInteraction;