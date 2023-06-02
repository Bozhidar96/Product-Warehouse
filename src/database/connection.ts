import { Client } from "pg";
require("dotenv").config();

const client: Client = new Client({
  user: process.env.USER,
  host: "localhost",
  database: "postgres",
  password: process.env.PASSWORD,
  port: 5432,
});

client.connect();

export default client;
