import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../lib/bcrypt.lib.js";
import { GetProductById } from "../models/models.products.js";
import {
  AddFavorite,
  GetFavorites,
  GetUserByUsername,
  GetUsernameByEmail,
  RemoveFavorite,
  SaveUser,
} from "../models/models.user.js";
import { IRequestWithUser, KnownErrors } from "../schemas/interfaces.js";
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

// Handle the GET request to /api/v1/user/favorites (Get the user's favorites plants ids)
export const HandleFavoritesGet = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id || !req.user.username)
      throw new Error(KnownErrors.REQ_NO_USER);

    const favorites = await GetFavorites(req.user.id);

    res.json({
      error: false,
      message: "Favorites retrieved successfully",
      favorites,
    });
  } catch (error) {
    next(error);
  }
};

// Handle the POST request to /api/v1/user/favorites (Add a plant to the user's favorites)
export const HandleFavoritesPost = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id || !req.user.username)
      throw new Error(KnownErrors.REQ_NO_USER);

    // Validate the url parameter
    let { plant_id } = req.params;

    if (!plant_id) {
      return res.status(400).json({
        error: true,
        message: "Plant id is required as a url parameter",
      });
    }

    // Check the plant exists
    const plant = await GetProductById(Number(plant_id));

    if (!plant) {
      return res.status(404).json({
        error: true,
        message: "Plant was not found",
      });
    }

    // Check the plant is not already in the user's favorites
    const userFavorites = await GetFavorites(req.user.id);

    if (userFavorites.includes(Number(plant_id))) {
      return res.status(409).json({
        error: true,
        message: "Plant is already in favorites",
      });
    }

    // Add the plant to the user's favorites
    await AddFavorite(Number(plant_id), req.user.id);

    res.json({
      error: false,
      message: "Plant added to favorites successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const HandleFavoritesDelete = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id || !req.user.username)
      throw new Error(KnownErrors.REQ_NO_USER);

    // Validate the url parameter
    let { plant_id } = req.params;

    if (!plant_id) {
      return res.status(400).json({
        error: true,
        message: "Plant id is required as a url parameter",
      });
    }

    // Check if the plant exists
    const plant = await GetProductById(Number(plant_id));

    if (!plant) {
      return res.status(404).json({
        error: true,
        message: "Plant was not found",
      });
    }

    // Check if the plant is in the user's favorites
    const userFavorites = await GetFavorites(req.user.id);

    if (!userFavorites.includes(Number(plant_id))) {
      return res.status(409).json({
        error: true,
        message: "Plant is not in favorites",
      });
    }

    // Remove the plant from the user's favorites
    await RemoveFavorite(Number(plant_id), req.user.id);

    res.json({
      error: false,
      message: "Plant removed from favorites successfully",
    });
  } catch (error) {
    next(error);
  }
};
