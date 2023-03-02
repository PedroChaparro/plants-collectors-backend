import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../lib/bcrypt.lib.js";
import {
  GetUserByUsername,
  GetUsernameByEmail,
  SaveUser,
} from "../models/models.user.js";
import { signupRequestSchema } from "../schemas/request.schemas.js";

// Handle the POST request to /api/v1/user/signup (Create a new user)
export const HandleSignupPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signupRequestSchema.parse(req.body);
    const { username, email, password } = req.body;

    // Check the username is unique
    const userByUsername = await GetUserByUsername(username);
    if (userByUsername) {
      return res.status(409).json({
        error: true,
        message: "Username already taken",
      });
    }

    // Check the email is unique
    const userByEmail = await GetUsernameByEmail(email);
    if (userByEmail) {
      return res.status(409).json({
        error: true,
        message: "Email already taken",
      });
    }

    // Hash the password
    const [wasHashed, hash] = await hashPassword(password);
    if (!wasHashed) return next();

    // Save the user
    const saved = await SaveUser({
      username,
      email,
      password: hash,
    });

    if (!saved) next();

    // Send a success response
    res.status(201).json({
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    // Throw the error to be handled by the error handler
    next(error);
  }
};
