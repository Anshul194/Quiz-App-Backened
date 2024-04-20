import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface for the answer document
interface IAnswer extends Document {
    questionId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    choiceId: mongoose.Types.ObjectId;
    score:Number
  }
  if ((mongoose.connection.models as any)['Answer']) {
    delete (mongoose.connection.models as any)['Answer'];
  }
  
  // Define the Mongoose schema for the answer model
  const answerSchema = new Schema<IAnswer>({
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: [true, 'Question ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    choiceId: {
      type: Schema.Types.ObjectId,
      ref: 'Choice',
      required: [true, 'Choice ID is required'],
    },
    score:{
      type:Number,
      required: true
    }
  });
  

  export const Answer = mongoose.model<IAnswer>('Answer', answerSchema);
