
import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface for the choice document
interface IChoice extends Document {
  Option: string;
  isCorrect:Boolean;
  questionId:String
  }
  

  if ((mongoose.connection.models as any)['Choice']) {
    delete (mongoose.connection.models as any)['Choice'];
  }
  // Define the Mongoose schema for the choice model
  const choiceSchema = new Schema<IChoice>({
    questionId:{
      type: String,
      required: true,
    },
    Option: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
  });
  
  // Create and export the Mongoose model for Choice
  export const Choice = mongoose.model<IChoice>('Choice', choiceSchema);