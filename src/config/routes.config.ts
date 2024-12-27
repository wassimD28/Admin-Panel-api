// src/config/routes.config.ts
import { Express } from "express";
import courseRoute from "../routes/course.route";


export class RouteConfig {
  static configure(app: Express): void {
    // Configure routes
    app.use("/api/course", courseRoute);
  }
}
