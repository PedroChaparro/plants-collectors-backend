import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { routes } from "./routes/router.js";
import { ZodError } from "zod";

// Configure environment variables
dotenv.config();

// Create express app and configure default middlewares
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Configure routes
app.use("/api/v1/session", routes.session);
app.use("/api/v1/user", routes.user);
app.use("/api/v1/product", routes.products);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Catch zod errors and send a 400 response with the incorrect fields
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: true,
      message: [
        err.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      ],
    });
  }

  // Unhandled errors
  return res.status(500).json({
    error: true,
    message: "Internal server error, please try again later",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
