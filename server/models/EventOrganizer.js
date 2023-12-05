import mongoose from "mongoose";

const EventOrganizerSchema = new mongoose.Schema(
  {
   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    IDcardFront: {
      type: String,
    
      
    },
    IDcardBack: {
      type: String, // You can change this to a specific type based on your needs, e.g., Buffer for storing file data.
     
    },
  
   
  },
  { timestamps: true }
);

const EventOrganizer = mongoose.model("EventOrganizer", EventOrganizerSchema);
export default EventOrganizer;
