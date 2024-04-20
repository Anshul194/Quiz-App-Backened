import express from "express";
import validateUser from "../middleware/UserValidation";
import { Result } from "../Controller/ResultController";
const ScoreRouter = express.Router();

ScoreRouter.post("/Score",validateUser,Result);


export default ScoreRouter;
