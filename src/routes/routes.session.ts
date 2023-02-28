import { Router, Request, Response } from "express";
export const SessionRouter = Router();

// Session routes
SessionRouter.get("/hi", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});
