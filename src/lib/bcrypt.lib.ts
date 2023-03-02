import bcrypt from "bcrypt";

/**
 * @param password The password to hash
 * @returns [boolean, string] The first value is a boolean that indicates if the operation was successful, the second value is the hash
 */
export const hashPassword = async (
  password: string
): Promise<[boolean, string]> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return [true, hash];
  } catch (error) {
    return [false, ""];
  }
};

/**
 * @param password The password to compare
 * @param hash The hash to compare with
 * @returns boolean The result of the comparison
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    return false;
  }
};
