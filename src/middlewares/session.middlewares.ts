import { NextFunction, Request, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../lib/jwt.lib.js";
import { JWTValidationErrors } from "../schemas/interfaces.js";

// Middleware to check if the access token is provided and is valid / not expired
export const mustProvideAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the bearer token value from the authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Access token is required",
    });
  }

  // Check the token is valid
  const [error, _] = verifyAccessToken(token);

  if (error && error.message == JWTValidationErrors.EXPIRED) {
    return res.status(403).json({
      error: true,
      message: "Access token has expired",
    });
  }

  if (error && error.message === JWTValidationErrors.INVALID) {
    return res.status(401).json({
      error: true,
      message: "Access token is invalid",
    });
  }

  // Continue
  next();
};

// Middleware to check if the refresh token is provided and is valid / not expired
export const mustProvideRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Refresh token is required",
    });
  }

  // Check the token is valid
  const [error, _] = verifyRefreshToken(token);

  if (error && error.message == JWTValidationErrors.EXPIRED) {
    return res.status(403).json({
      error: true,
      message: "Refresh token has expired",
    });
  }

  if (error && error.message === JWTValidationErrors.INVALID) {
    return res.status(401).json({
      error: true,
      message: "Refresh token is invalid",
    });
  }

  // Continue
  next();
};
