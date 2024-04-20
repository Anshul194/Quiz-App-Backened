import express from "express";
import { Login, Register } from "../Controller/AdminController";
const AdminRouter = express.Router();

AdminRouter.post("/admin-login",Login);
AdminRouter.post("/register-admin",Register);




export default AdminRouter;
