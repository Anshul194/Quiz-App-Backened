import express from "express";
import { createQuestion, deleteQuestion, updateQuestion } from "../Controller/AdminTaskController";
import {GetallQuestion} from '../Controller/QuestionController'
import validateUser from "../middleware/UserValidation";
import validateAdmin from "../middleware/AdminValidation";
const QuestionRouter = express.Router();

QuestionRouter.post("/add-question",validateAdmin,createQuestion)
QuestionRouter.delete("/delete-question",validateAdmin,deleteQuestion)
QuestionRouter.put("/update-question",validateAdmin,updateQuestion)
QuestionRouter.get("/get-question",GetallQuestion)



export default QuestionRouter;
