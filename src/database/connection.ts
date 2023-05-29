import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432, // Change port if necessary
});

export default pool;
