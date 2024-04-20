import { Request, Response, NextFunction } from "express";
import { Answer } from "../models/Answer";
import { Choice } from "../models/Choice";
import catchAsyncError from "../middleware/catchAsyncError";
import { Question } from "../models/User";
import SuccessHandler from "../SuccesRespose";

const submitAnswer = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { questionId } = req.query;
      const { choiceId } = req.body;
      const userId = req.user.user.id;
      //console.log(questionId)

      // Check if the user has already submitted an answer for the same question
      const existingAnswer = await Answer.findOne({
        questionId,
        userId,
      });

      if (existingAnswer) {
        return res
          .status(400)
          .json({
            message: "You have already submitted an answer for this question",
          });
      }

      const correctChoice = await Choice.findOne({
        questionId,
        isCorrect: true,
      });
      //console.log(correctChoice)
      if (!correctChoice) {
        return res
          .status(404)
          .json({ message: "Correct choice not found for the question" });
      }
      // Calculate the score
      const isCorrect = correctChoice._id.equals(choiceId);
      const QuestionData = await Question.findOne({ _id: questionId });
      console.log(QuestionData);
      const score = isCorrect ? QuestionData?.score : 0;

      // Create and save the answer
      const answer = Answer.create({
        questionId,
        userId,
        choiceId,
        score,
      });

      SuccessHandler.sendSuccessResponse(res, "Answer submitted successfully");
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server error", error: error.message });
    }
  }
);

export { submitAnswer };
