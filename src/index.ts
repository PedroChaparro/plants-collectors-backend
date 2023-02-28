import express, { Express } from "express";
import dotenv from "dotenv";
import { routes } from "./routes/router.js";

// Configure environment variables
dotenv.config();

// Create express app and configure default middlewares
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Configure routes
app.use("/api/v1/session", routes.session);
app.use("/api/v1/users", routes.user);
app.use("/api/v1/products", routes.products);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
