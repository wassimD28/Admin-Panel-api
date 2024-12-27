import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
//! IMPORTANT: the .env file should be include the database configuration or put the default value down below
const dbName = process.env.DB_NAME || "database_name"; // Make sure to use the correct database name
const dbUser = process.env.DB_USER || "postgres"; // Don't change this if you are using the default postgres user
const dbPass = process.env.DB_PASS || "database_password"; // Make sure to use the correct password
const dbHost = process.env.DB_HOST || "localhost"; // usually it's localhost
const dbPort = process.env.DB_PORT || "5432"; // Make sure to use the correct port, its usually 5432 for postgres


const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: parseInt(dbPort),
  dialect: "postgres",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test the connection immediately
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:");
    console.error("Error Code:", err.original?.code);
    console.error("Error Message:", err.message);
    console.error("Full Error:", err);
  });

export default sequelize;
