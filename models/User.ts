import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface for the user document
interface IUser extends Document {
  email: string;
  password: string;
}

// Define the Mongoose schema for the user model
const userSchema = new Schema<IUser>({
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

// Create and export the Mongoose model for User
export const User = mongoose.model<IUser>('User', userSchema);


// Define the TypeScript interface for the question document
interface IQuestion extends Document {
  title: string;
  feedback: string;
  description: string;
  level: 'high' | 'medium' | 'low';
  score: number;
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
});

// Create and export the Mongoose model for Question
export const Question = mongoose.model<IQuestion>('Question', questionSchema);


// Define the TypeScript interface for the choice document
interface IChoice extends Document {
  title: string;
}

// Define the Mongoose schema for the choice model
const choiceSchema = new Schema<IChoice>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
});

// Create and export the Mongoose model for Choice
export const Choice = mongoose.model<IChoice>('Choice', choiceSchema);


// Define the TypeScript interface for the answer document
interface IAnswer extends Document {
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  choiceId: mongoose.Types.ObjectId;
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
});

// Create and export the Mongoose model for Answer
export const Answer = mongoose.model<IAnswer>('Answer', answerSchema);
