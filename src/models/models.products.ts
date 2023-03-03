import { DatabasePool } from "../database/database.js";
import { TPopulatedPlant } from "../schemas/interfaces.js";

/**
 * @returns An array of all plants with their owner's username
 */
export const GetProducts = async (): Promise<TPopulatedPlant[]> => {
  try {
    const query = "SELECT * FROM PLANTS_WITH_POPULATED_USER";
    const response = await DatabasePool.query(query);
    return response.rows as TPopulatedPlant[];
  } catch (error) {
    return [];
  }
};
