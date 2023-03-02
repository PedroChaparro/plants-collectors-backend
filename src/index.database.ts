import { faker } from "@faker-js/faker";
import { DatabasePool } from "./database/database.js";
import { hashPassword } from "./lib/bcrypt.lib.js";

// Global variables
const usersIds: number[] = [];

// Genereta en insert random users
const insertRandomUsers = async () => {
  try {
    // Create an array of 10 users
    const users = Array.from({ length: 10 }, (_, i) => ({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }));

    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";

    // Insert all the users at once
    await Promise.all(
      users.map(async (user) => {
        // Hash the password
        const [succ, hash] = await hashPassword(user.password);
        if (!succ) throw new Error("Error hashing password");

        // Insert the user and save the id
        const response = await DatabasePool.query(query, [
          user.username,
          user.email,
          hash,
        ]);

        usersIds.push(response.rows[0].id);
      })
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Execute the functions
const main = async () => {
  await insertRandomUsers();
};

main();
