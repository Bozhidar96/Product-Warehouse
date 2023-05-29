import { Pool } from "pg";

const pool: Pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATA_BASE_NAME,
  password: process.env.PASSWORD,
  port: 5432, // Change port if necessary
});

export default pool;
