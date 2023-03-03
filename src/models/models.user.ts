import { DatabasePool } from "../database/database.js";
import { TUser } from "../schemas/interfaces.js";

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
export const GetFavorites = async (userId: number): Promise<number[]> => {
  try {
    // Check all parameters are provided
    if (!userId) return [];

    const query = "SELECT plant_id FROM USER_HAS_FAVORITES WHERE user_id = $1";
    const response = await DatabasePool.query(query, [userId]);
    return response.rows.map((plant) => plant.plant_id);
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
