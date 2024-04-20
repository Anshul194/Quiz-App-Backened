import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import UserRouter from "./routes/User";
import AdminTaskRouter from "./routes/Choice";
import QuestionRouter from "./routes/Question";
import AnswerRouter from "./routes/Answer";
import ScoreRouter from "./routes/Other";
import AdminRouter from "./routes/Admin";
const app = express();
app.use(express.json());
app.use(cors({}));
app.use("/", UserRouter);
app.use("/", AdminTaskRouter);
app.use("/", QuestionRouter);
app.use("/", AnswerRouter);
app.use("/", ScoreRouter);
app.use("/", AdminRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

export default app;
