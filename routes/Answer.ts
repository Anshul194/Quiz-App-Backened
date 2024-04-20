import express from "express";
import { submitAnswer } from "../Controller/AnswerController";
import validateUser from "../middleware/UserValidation";
const AnswerRouter = express.Router();

AnswerRouter.post("/submit",validateUser,submitAnswer);



export default AnswerRouter;
