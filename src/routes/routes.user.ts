import { Router } from "express";
import { HandleSignupPost } from "../controllers/controllers.user.js";

export const UserRouter = Router();
UserRouter.post("/signup", HandleSignupPost);
