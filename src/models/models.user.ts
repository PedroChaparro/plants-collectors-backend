import { DatabasePool } from "../database/database.js";
import { TPopulatedPlant, TUser } from "../schemas/interfaces.js";

export const GetUserByUsername = async (
  username: string,
  includeSensitiveData = false
): Promise<TUser | null> => {
  try {
    const query = includeSensitiveData
      ? "SELECT id, username, email, password FROM users WHERE username = $1"
      : "SELECT id, username, email FROM users WHERE username = $1";

    const response = await DatabasePool.query(query, [username]);
    return response.rows[0] as TUser;
  } catch (error) {
    return null;
  }
};

export const GetUsernameByEmail = async (
  email: string,
  includeSensitiveData = false
): Promise<TUser | null> => {
  try {
    const query = includeSensitiveData
      ? "SELECT id, username, email, password FROM users WHERE email = $1"
      : "SELECT id, username, email FROM users WHERE email = $1";

    const response = await DatabasePool.query(query, [email]);
    return response.rows[0] as TUser;
  } catch (error) {
    return null;
  }
};

/**
 * @param user The user to save
 * @returns A boolean indicating if the user was saved or not
 */
export const SaveUser = async (user: TUser): Promise<boolean> => {
  try {
    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    await DatabasePool.query(query, [user.username, user.email, user.password]);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @param userId The id of the user to get the favorites for
 * @returns An array of ids of the favorite user's plants
 */
export const GetFavorites = async (
  userId: number
): Promise<TPopulatedPlant[]> => {
  try {
    // Check all parameters are provided
    if (!userId) return [];

    const favoritesIdsQuery =
      "SELECT plant_id FROM USER_HAS_FAVORITES WHERE user_id = $1";
    const response = await DatabasePool.query(favoritesIdsQuery, [userId]);
    const ids = response.rows.map((plant) => plant.plant_id);

    // Get the plants from their ids
    const plantsQuery =
      "SELECT * FROM populated_plants WHERE plant_id = ANY($1)";
    const plantsResponse = await DatabasePool.query(plantsQuery, [ids]);

    // Fix the average rate to 2 decimals and add the image endpoint
    const plants = plantsResponse.rows.map((plant) => {
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

/**
 *
 * @param plantId The id of the plant to add to the favorites
 * @param userId The id of the user to add the plant to
 * @returns A boolean indicating if the plant was added to the favorites or not
 */
export const AddFavorite = async (
  plantId: number,
  userId: number
): Promise<boolean> => {
  try {
    // Check all parameters are provided
    if (!plantId || !userId) return false;

    const query =
      "INSERT INTO USER_HAS_FAVORITES (plant_id, user_id) VALUES ($1, $2)";
    await DatabasePool.query(query, [plantId, userId]);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @param plantId the id of the plant to remove from the favorites
 * @param userId the id of the user to remove the plant from
 * @returns A boolean indicating if the plant was removed from the favorites or not
 */
export const RemoveFavorite = async (
  plantId: number,
  userId: number
): Promise<boolean> => {
  try {
    const query =
      "DELETE FROM USER_HAS_FAVORITES WHERE plant_id = $1 AND user_id = $2";
    await DatabasePool.query(query, [plantId, userId]);
    return true;
  } catch {
    return false;
  }
};
