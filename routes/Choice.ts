import express from "express";
import { createQuestionChoices } from '../Controller/AdminTaskController';
import validateAdmin from "../middleware/AdminValidation";
const AdminTaskRouter = express.Router();

AdminTaskRouter.post("/add-choice",validateAdmin,createQuestionChoices);



export default AdminTaskRouter;
