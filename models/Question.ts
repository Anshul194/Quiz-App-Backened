
import mongoose, { Schema, Document } from 'mongoose';
import {Choice} from '../models/Choice'
interface IQuestion extends Document {
    title: string;
    feedback: string;
    description: string;
    level: 'high' | 'medium' | 'low';
    score: number;
    choices: typeof Choice[];  
  }
  if ((mongoose.connection.models as any)['Question']) {
    delete (mongoose.connection.models as any)['Question'];
  }
  

// Define the Mongoose schema for the question model
const questionSchema = new Schema<IQuestion>({
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    feedback: {
      type: String,
      required: [true, 'Feedback is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    level: {
      type: String,
      enum: ['high', 'medium', 'low'],
      required: [true, 'Level is required'],
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
    },
    choices: [{
      type: Schema.Types.ObjectId,
      ref: 'Choice',
    }],
  });
  
  // Create and export the Mongoose model for Question
  export const Question = mongoose.model<IQuestion>('Question', questionSchema);