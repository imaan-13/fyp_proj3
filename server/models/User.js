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
