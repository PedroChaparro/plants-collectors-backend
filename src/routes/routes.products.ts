import { Router } from "express";
import { HandleProductsGet } from "../controllers/controller.products.js";

export const ProductsRouter = Router();
ProductsRouter.get("/", HandleProductsGet);
