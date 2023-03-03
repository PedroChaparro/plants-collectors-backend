import { DatabasePool } from "../database/database.js";
import { TPopulatedPlant } from "../schemas/interfaces.js";

/**
 * @returns An array of all plants with their owner's username
 */
export const GetProducts = async (): Promise<TPopulatedPlant[]> => {
  try {
    const query = "SELECT * FROM POPULATED_PLANTS";
    const response = await DatabasePool.query(query);

    // Fix the average rate to 2 decimals and add the image endpoint
    const plants = response.rows.map((plant) => {
      const currentAverageRate = Number.parseFloat(plant.average_rate);
      const fixedAverageRate = currentAverageRate.toFixed(2);

      const imagePath =
        plant.plant_name.toLowerCase().split(" ").join("_") + ".jpg";

      return {
        ...plant,
        image_endpoint: `/static/${imagePath}`,
        average_rate: Number.parseFloat(fixedAverageRate),
      };
    });

    return plants as TPopulatedPlant[];
  } catch (error) {
    return [];
  }
};
