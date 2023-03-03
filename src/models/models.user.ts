import { QueryResult } from "pg";
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
