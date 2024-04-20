// adminRoutes.js

import express, { Request, Response, NextFunction } from "express";
import { Question } from "../models/Question";
import { Choice } from "../models/Choice";
import catchAsyncError from "../middleware/catchAsyncError";
import mongoose from "mongoose";
import SuccessHandler from "../SuccesRespose";

const router = express.Router();

type Questiontype = {
  title: String;
  feedback: String;
  description: String;
  level: String;
  score: Number;
};

// Add a new question

const createQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, feedback, description, level, score } =
        req.body as unknown as Questiontype;

      // Validate request body

      if (
        !title ||
        !feedback ||
        !description ||
        !level ||
        !score 
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create a new question
      const newQuestion = await Question.create({
        title,
        feedback,
        description,
        level,
        score,
      });

      // Save the question to the database
      const savedQuestion = await newQuestion.save();
      SuccessHandler.sendSuccessResponse(res, "Question Added successfully", {
        savedQuestion,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to create question", error: error.message });
    }
  }
);

// Add a new choice

const createQuestionChoices = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Option, correctIndex } = req.body;
    const { questionId } = req.query;

    // Check if Option and correctIndex are provided
    if (
      !Option ||
      !Array.isArray(Option) ||
      Option.length !== 4 ||
      typeof correctIndex !== "number" ||
      correctIndex < 0 ||
      correctIndex >= 4
    ) {
      return res.status(400).json({
        message:
          "Options must be an array containing 4 strings and a valid correctIndex",
      });
    }

    try {
      const question = await Question.findById(questionId);

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      const createdChoices = [];

      // Create and save 4 choice options with unique ObjectIds
      for (let i = 0; i < 4; i++) {
        const isCorrect = i === correctIndex;
        const choiceId = new mongoose.Types.ObjectId();

        const optionValue = await Choice.create({
          _id: choiceId,
          Option: Option[i],
          isCorrect,
          questionId,
        });

        await optionValue.save();
        createdChoices.push(optionValue);

        // Update the associated Question's choices array
        question.choices.push(optionValue._id);
      }

      // Save the updated question
      await question.save();

      SuccessHandler.sendSuccessResponse(res, "Choices Added successfully", {
        createdChoices,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ message: "Failed to create choices" });
    }
  }
);



// delete question
const deleteQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;

    try {
      // Check if choices exist for the given question ID
      const existingChoices = await Choice.find({ questionId: id });

      // If choices exist, delete them first
      if (existingChoices.length > 0) {
        await Choice.deleteMany({ questionId: id });
      }

      // Delete the question
      const deletedQuestion = await Question.findByIdAndDelete(id);

      if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      SuccessHandler.sendSuccessResponse(res, "Question and associated choices deleted successfully", {
        deletedQuestion,
      });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Failed to delete question", error: error.message });
    }
  }
);


// update Question

const updateQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string | undefined;
    console.log(id);
    const { title, feedback, description, level, score } =
      req.body as unknown as Questiontype;

    // Validate request body
    if (
      !title ||
      !feedback ||
      !description ||
      !level ||
      !score ||
      typeof score !== "number"
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if id is provided and if it's a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid question ID" });
    }

    try {
      const updatedQuestion = await Question.findByIdAndUpdate(
        id,
        {
          title,
          feedback,
          description,
          level,
          score,
        },
        { new: true }
      );

      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }

      SuccessHandler.sendSuccessResponse(res, "Question Updated successfully", {
        updatedQuestion,
      });
    } catch (error: any) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Failed to update question", error: error.message });
    }
  }
);

export {
  createQuestion,
  createQuestionChoices,
  updateQuestion,
  deleteQuestion,
};
