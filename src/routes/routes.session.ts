import { Router, Request, Response } from "express";
import {
  HandleLoginPost,
  HandleRefreshGet,
  HandleValidateGet,
} from "../controllers/controllers.session.js";
import {
  mustProvideAccessToken,
  mustProvideRefreshToken,
} from "../middlewares/session.middlewares.js";

export const SessionRouter = Router();
SessionRouter.post("/login", HandleLoginPost);
SessionRouter.get("/validate", mustProvideAccessToken, HandleValidateGet);
SessionRouter.get("/refresh", mustProvideRefreshToken, HandleRefreshGet);
