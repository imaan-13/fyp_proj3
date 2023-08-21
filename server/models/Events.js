import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    startDateTime: {
        type: Date,
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
    }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
