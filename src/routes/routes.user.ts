import { Router } from "express";
import {
  HandleFavoritesDelete,
  HandleFavoritesGet,
  HandleFavoritesPost,
  HandleSignupPost,
} from "../controllers/controllers.user.js";
import { mustProvideAccessToken } from "../middlewares/session.middlewares.js";

export const UserRouter = Router();

UserRouter.post("/signup", HandleSignupPost);

UserRouter.get("/favorites", mustProvideAccessToken, HandleFavoritesGet);

UserRouter.post(
  "/favorites/:plant_id",
  mustProvideAccessToken,
  HandleFavoritesPost
);

UserRouter.delete(
  "/favorites/:plant_id",
  mustProvideAccessToken,
  HandleFavoritesDelete
);
