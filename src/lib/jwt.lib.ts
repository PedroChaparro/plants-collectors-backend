import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { KnownErrors } from "../schemas/interfaces.js";
dotenv.config();

// Some global configs and interfaces
const CONFIG = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

interface IJWTPayload {
  id: number;
  username: string;
}

// Functions

/**
 * @param payload Payload to be signed and saved in the token custom claims
 * @returns [success, token] Returns an array with a boolean indicating if the token was generated successfully and the token itself
 */
export const generateAccessToken = (
  payload: IJWTPayload
): [boolean, String] => {
  try {
    // Ensure that the secret is defined
    if (!CONFIG.ACCESS_TOKEN_SECRET) {
      console.log("ACCESS_TOKEN_SECRET not defined");
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const token = jwt.sign(payload, CONFIG.ACCESS_TOKEN_SECRET, {
      expiresIn: "15 minutes",
      issuer: "plants_collectors_api",
      subject: payload.id.toString(),
      notBefore: "1", // The token will be valid 1ms after the generation
    });
    return [true, token];
  } catch (error) {
    return [false, ""];
  }
};

/**
 *
 * @param payload Payload to be signed and saved in the token custom claims
 * @returns [success, token] Returns an array with a boolean indicating if the token was generated successfully and the token itself
 */
export const generateRefreshToken = (
  payload: IJWTPayload
): [boolean, String] => {
  try {
    // Ensure that the secret is defined
    if (!CONFIG.REFRESH_TOKEN_SECRET) {
      console.log("REFRESH_TOKEN_SECRET not defined");
      throw new Error("REFRESH_TOKEN_SECRET not defined");
    }

    const token = jwt.sign(payload, CONFIG.REFRESH_TOKEN_SECRET, {
      expiresIn: "7 days",
      issuer: "plants_collectors_api",
      subject: payload.id.toString(),
      notBefore: "1",
    });
    return [true, token];
  } catch (error) {
    return [false, ""];
  }
};

/**
 *
 * @param token Access token string to be verified
 * @returns Returns an array with the error and the payload if the token is valid, null otherwise
 */
export const verifyAccessToken = (
  token: string
): [Error | null, IJWTPayload | null] => {
  try {
    // Ensure that the secret is defined
    if (!CONFIG.ACCESS_TOKEN_SECRET) {
      console.log("ACCESS_TOKEN_SECRET not defined");
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const claims = jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET);
    return [null, claims as IJWTPayload];
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return [new Error(KnownErrors.JWT_EXPIRED), null];
    }

    return [new Error(KnownErrors.JWT_INVALID), null];
  }
};

/**
 * @param token Refresh token string to be verified
 * @returns Returns an array with the error and the payload if the token is valid, null otherwise
 */
export const verifyRefreshToken = (
  token: string
): [Error | null, IJWTPayload | null] => {
  try {
    if (!CONFIG.REFRESH_TOKEN_SECRET) {
      console.log("REFRESH_TOKEN_SECRET not defined");
      throw new Error("REFRESH_TOKEN_SECRET not defined");
    }

    const claims = jwt.verify(token, CONFIG.REFRESH_TOKEN_SECRET);
    return [null, claims as IJWTPayload];
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return [new Error(KnownErrors.JWT_EXPIRED), null];
    }

    return [new Error(KnownErrors.JWT_INVALID), null];
  }
};
