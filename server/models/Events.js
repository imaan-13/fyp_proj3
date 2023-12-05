import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    eventName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        // required: true
    },
    
    startTime: {  // Separate time field
        type: String,  // You can choose a suitable data type for time (String or Date)
        // required: true
    },
    // startTiming: {
    //     type: String,
    //     // required: true
    // },
    locationType: {
        type: String,
        enum: ['inPerson', 'virtual'],
        // required: true
    },
    details: {
        type: String,
        // required: true
    },
    contact:{
        type:Number
    }

    ,
    community:{
        type:String
    }

    ,
    photo:{
        type:String,
        // default:"no photo"
      },

  
    
    likes:{
        type:Array,
        default:[]
    },
    saved:{
        type:Array,
        default:[]
      }
      ,
    userPhoto:{
        type:String,
    },
    name:{
        type:String
    }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
