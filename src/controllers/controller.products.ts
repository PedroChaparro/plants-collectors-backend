import e, { NextFunction, Request, Response } from "express";
import { GetProducts } from "../models/models.products.js";

export const HandleProductsGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plants = await GetProducts();

    res.status(200).json({
      error: false,
      message: "Plants retrieved successfully",
      plants,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
