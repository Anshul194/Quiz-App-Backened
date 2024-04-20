import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error('DB_URL environment variable is not defined');
}

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export default connectDatabase;
