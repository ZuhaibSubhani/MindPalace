import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI 

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
  }
  
  export const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };


const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    Brain: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brain'
    }]
    
})

const brainSchema = new mongoose.Schema({
    title:String,
    description:String,
    link : String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const User = mongoose.model('User', userSchema);
const Brain = mongoose.model('Brain', brainSchema);
export {User, Brain};