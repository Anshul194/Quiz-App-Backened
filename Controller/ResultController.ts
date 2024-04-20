import { Request, Response, NextFunction } from "express";
import { Answer } from "../models/Answer";
import { Choice } from "../models/Choice";
import catchAsyncError from "../middleware/catchAsyncError";
import SuccessHandler from "../SuccesRespose";

const Result = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.user.id;
    try {
      // Fetch all answers for the given userId
      const answers = await Answer.find({ userId }).populate("choiceId");
      let totalScore = 0;
      const correctAnswers = [];
      const incorrectAnswers = [];
      for (const answer of answers) {
        const choice = await Choice.findById(answer.choiceId);

        if (choice) {
          if (choice.isCorrect) {
            totalScore += Number(answer.score);
            correctAnswers.push(answer);
          } else {
            incorrectAnswers.push(answer);
          }
        }
      }

      const incorrectCount = incorrectAnswers.length;
      const correctCount = correctAnswers.length;
      SuccessHandler.sendSuccessResponse(res, "Result", {
        totalScore: totalScore,
        correctCount: correctCount,
        correctAnswers: correctAnswers,
        incorrectCount: incorrectCount,
        incorrectAnswers: incorrectAnswers,
      });
    } catch (error: any) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Failed to fetch data", error: error.message });
    }
  }
);

export { Result };
