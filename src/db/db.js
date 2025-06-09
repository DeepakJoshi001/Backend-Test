import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_auth",
});

console.log("Database connection established");

export default db;
