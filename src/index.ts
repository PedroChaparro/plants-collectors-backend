import express, { Express } from "express";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config();

// Create express app and configure default middlewares
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Configure routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
