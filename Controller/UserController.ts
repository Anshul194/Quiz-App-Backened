import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models/User";
import catchAsyncError from "../middleware/catchAsyncError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SuccessHandler from "../SuccesRespose";
import { Answer } from "../models/Answer";
import { isValidEmail } from "../Email-passwordValidtion";

// Register a user

const Register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Validate password
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = User.create({
        email,
        password: hashedPassword,
      });

      SuccessHandler.sendSuccessResponse(res, "User Registered successfully");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Login a user

const Login: RequestHandler = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "All fields are mandatory" });
        return;
      }

      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: "Invalid email or password" });
        return;
      }

      // match password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            isUserToken: true,
          },
        },
        process.env.Access_Token_Secret || "",
        { expiresIn: "30m" }
      );
      SuccessHandler.sendSuccessResponse(res, "Login successful", {
        accessToken,
      });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server error", error: error.message });
    }
  }
);



export { Register, Login };
