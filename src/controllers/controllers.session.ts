import { NextFunction, Request, Response } from "express";
import { comparePassword } from "../lib/bcrypt.lib.js";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt.lib.js";
import { GetUserByUsername } from "../models/models.user.js";
import { loginRequestSchema } from "../schemas/request.schemas.js";

// Handle the POST request to /api/v1/session/login
export const HandleLoginPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginRequestSchema.parse(req.body);
    const { username, password } = req.body;

    // Check if the user exists
    const user = await GetUserByUsername(username, true);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Username does not exist",
      });
    }

    // Check if the password is correct
    const isPasswordCorrect = await comparePassword(
      password,
      user.password || ""
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: true,
        message: "Password is incorrect",
      });
    }

    // Create the jwt tokens
    const [atCreated, accessToken] = generateAccessToken({
      id: user.id,
      username: user.username,
    });

    const [rtCreated, refreshToken] = generateRefreshToken({
      id: user.id,
      username: user.username,
    });

    if (!atCreated || !rtCreated) {
      return res.status(500).json({
        error: true,
        message: "Could not initialize session. Please try again later",
      });
    }

    res.json({
      error: false,
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
