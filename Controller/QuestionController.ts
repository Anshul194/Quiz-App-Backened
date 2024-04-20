import { Request, Response, NextFunction } from 'express';
import { Question } from '../models/Question';
import catchAsyncError from '../middleware/catchAsyncError';
import mongoose from 'mongoose';

 const GetallQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1; 
      const limit = 1; 

      const totalQuestions = await Question.countDocuments();
      const totalPages = Math.ceil(totalQuestions / limit);

      const skip = (page - 1) * limit;

      const questions = await Question.find()
        .skip(skip)
        .limit(limit).populate({
          path: 'choices',
          model: 'Choice',
        });;

      if (questions.length === 0 && page !== 1) {
        return res.status(404).json({ message: 'No more questions available' });
      }

      res.json({
        questions,
        currentPage: page,
        totalPages,
      });
    } catch (error:any) {
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);




export {GetallQuestion}