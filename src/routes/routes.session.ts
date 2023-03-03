import { Router, Request, Response } from "express";
import {
  HandleLoginPost,
  HandleValidateGet,
} from "../controllers/controllers.session.js";
import { mustProvideAccessToken } from "../middlewares/session.middlewares.js";

export const SessionRouter = Router();
SessionRouter.post("/login", HandleLoginPost);
SessionRouter.get("/validate", mustProvideAccessToken, HandleValidateGet);
