import { NextFunction, Request, Response } from "express";
import { comparePassword } from "../lib/bcrypt.lib.js";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt.lib.js";
import { GetUserByUsername } from "../models/models.user.js";
import { IRequestWithUser } from "../schemas/interfaces.js";
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

    if (!user || !user?.id) {
      return res.status(404).json({
        error: true,
        message: "Unable to find a valid user with the given username",
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

// Handle the GET request to /api/v1/session/validate (Check tokens)
export const HandleValidateGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    error: false,
    message: "Token is valid",
  });
};

// Handle the GET request to /api/v1/session/refresh (Refresh access token)
export const HandleRefreshGet = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check the user id is present
    if (!req.user) {
      return res.status(401).json({
        error: true,
        message: "User is not authenticated",
      });
    }

    // Get the user data from the username
    const user = await GetUserByUsername(req.user.username, true);

    if (!user || !user?.id) {
      return res.status(404).json({
        error: true,
        message: "Unable to find a valid user with the given username",
      });
    }

    // Create a new access token
    const [atCreated, accessToken] = generateAccessToken({
      id: user.id,
      username: user.username,
    });

    if (!atCreated) {
      return res.status(500).json({
        error: true,
        message: "Could not refresh session. Please try again later",
      });
    }

    res.json({
      error: false,
      message: "New access token generated",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
