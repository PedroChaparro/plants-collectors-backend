import { faker } from "@faker-js/faker";
import { DatabasePool } from "./database/database.js";
import { hashPassword } from "./lib/bcrypt.lib.js";
import path from "path";
import sharp from "sharp";
import plants from "./database/plants.json" assert { type: "json" };

// Global variables
const IMAGES_PATH = path.join(process.cwd(), "src", "public", "imgs");
const usersIds: number[] = [];

// Generete and insert random users
const insertRandomUsers = async () => {
  console.log("Inserting random users...");

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
    process.exit(1);
  }

  console.log("Users inserted!");
};

// Normalize the plants images to 500x500
const normalizePlantsImages = async () => {
  console.log("Normalizing plants images...");

  Promise.all(
    plants.map(async (plant) => {
      try {
        // Files should be named as the plant name plus _init.jpg
        const inputFileName = plant.toLowerCase().split(" ").join("_");
        const inputFilePath = path.join(
          IMAGES_PATH,
          inputFileName + "_init" + ".jpg"
        );

        // The output file should be named as the plant name plus .jpg
        // TODO: Use the plant id instead of the name
        const outputFilePath = path.join(IMAGES_PATH, inputFileName + ".jpg");

        // Resize and save the image
        await sharp(inputFilePath)
          .resize({ width: 500, height: 500, fit: "cover" })
          .toFile(outputFilePath);
      } catch (error) {
        console.log("Error: ", error);
        process.exit(1);
      }
    })
  );

  console.log("Images normalized!");
};

// Insert the plants
const insertPlants = async () => {
  console.log("Inserting plants...");

  try {
    // Insert the plants at once
    await Promise.all(
      plants.map(async (plant) => {
        const randomUserIndex = Math.floor(Math.random() * usersIds.length);
        const sellerId = usersIds[randomUserIndex];
        const query = "INSERT INTO plants (name, seller_id) VALUES ($1, $2)";
        DatabasePool.query(query, [plant, sellerId]);
      })
    );
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }

  console.log("Plants inserted!");
};

// Execute the functions
const main = async () => {
  await insertRandomUsers();
  await normalizePlantsImages();
  await insertPlants();
};

main();
