import express from "express";
import sequelize from "./config/database.config";
import { errorHandler, notFound } from "./middlewares/errorHandler.middleware";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { RouteConfig } from "./config/routes.config";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cors()); // to let the front-end access the api

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Setup database and associations
const initializeDatabase = async () => {
  try {

    // Sync database
    await sequelize.sync();
    console.log("Database connected and models synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit process with failure
  }
};

// Initialize database
initializeDatabase();

// configure all routes 
RouteConfig.configure(app);

// Add a basic root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default httpServer;
