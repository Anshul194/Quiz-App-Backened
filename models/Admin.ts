// Define the TypeScript interface for the admin document
import mongoose, { Schema, Document } from 'mongoose';


interface IAdmin extends Document {
    email: string;
    password: string;
  }
  
  // Define the Mongoose schema for the admin model
  const adminSchema = new Schema<IAdmin>({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  });
  
  // Create and export the Mongoose model for Admin
  export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
  