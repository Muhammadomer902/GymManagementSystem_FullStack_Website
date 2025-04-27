import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
