import { Router, Request, Response } from "express";
import { HandleLoginPost } from "../controllers/controllers.session.js";

export const SessionRouter = Router();
SessionRouter.post("/login", HandleLoginPost);
