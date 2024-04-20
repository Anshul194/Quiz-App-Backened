import { Request, Response, NextFunction, RequestHandler } from "express";
import { Admin } from "../models/Admin";
import catchAsyncError from "../middleware/catchAsyncError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SuccessHandler from "../SuccesRespose";
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
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = Admin.create({
        email,
        password: hashedPassword,
      });
      SuccessHandler.sendSuccessResponse(res, "Admin Registered successfully ");
    } catch (error: any) {
      //console.error("Error registering Admin:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Login Admin
const Login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "All fields are mandatory" });
        return;
      }
      // console.log(email, password);
      const admin = await Admin.findOne({ email });
      // console.log(admin);
      if (!admin) {
        res.status(404).json({ message: "Invalid email or password" });
        return;
      }

      // Using bcrypt library for hash password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // jwt for accessing token
      const accessToken = jwt.sign(
        {
          adminData: {
            id: admin?.id,
            email: admin?.email,
            isAdminToken: true,
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
