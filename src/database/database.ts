import Pg from "pg";

export const DatabasePool = new Pg.Pool({
  database: process.env.POSTGRES_DB || "plants_collectors",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
});
