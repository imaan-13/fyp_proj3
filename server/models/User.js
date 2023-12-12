import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {

    userId:{
      type:String
    
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends:[ {
      type: mongoose.Schema.Types.ObjectId,
      // default: [],
      ref:"User"
    }]
    
    ,
    location: String,

    // location: {
    //   type: { type: String, enum: ['Point'], default: 'Point' },
    //   coordinates: [Number],
    // },

    // location2: {
    //   type: {
    //     type: String,
    //     enum: ['Point'],
    //     default: 'Point',
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: true,
    //   },
    // },
    latitude: {
      type: Number,
      default:0,
      // required: true,
    },
    longitude: {
      type: Number,
      default:0,
      // required: true,
    },
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    // likedPosts:{type:Array,
    //   default:[],
    // },
  },
  
  { timestamps: true }

);

const User = mongoose.model("User", UserSchema);
export default User;
