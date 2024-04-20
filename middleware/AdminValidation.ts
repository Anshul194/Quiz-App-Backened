import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError";
import { Admin } from "../models/Admin";

const validateAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not provided" });
    }

    // Check if authHeader is an array
    if (Array.isArray(authHeader)) {
      authHeader = authHeader[0]; // Take the first element
    }

    if (!authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid token format" });
    }

    token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.Access_Token_Secret as string,
      async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Unauthorized - Invalid token" });
        }
        console.log(decoded);
        if (!decoded.adminData || !decoded.adminData.isAdminToken) {
          return res.status(403).json({ message: "Invalid admin token" });
        }

        try {
          const user = await Admin.findById(decoded.adminData.id);
          if (!user) {
            return res.status(404).json({ message: "Admin not found" });
          }

          req.user = decoded;
          next();
        } catch (error: any) {
          console.error(error);
          res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
        }
      }
    );
  }
);

export default validateAdmin;
