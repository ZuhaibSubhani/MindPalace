import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Function to connect to the database
export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Brain: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brain",
    },
  ],
});

// Define the Brain schema
const brainSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  type: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Prevent model overwriting
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Brain = mongoose.models.Brain || mongoose.model("Brain", brainSchema);

export { User, Brain };