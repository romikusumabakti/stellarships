import "dotenv/config";

import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const conn = await pool.getConnection();
console.log(`Terhubung ke basis data (${process.env.DB_NAME}).`);

export default conn;
