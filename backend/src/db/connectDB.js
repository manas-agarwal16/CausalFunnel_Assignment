import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log("DB error", error);
    throw error;
  }
};

export default connectDB;
