// src/config/routes.config.ts
import { Express } from "express";
import courseRoute from "../routes/course.route";
import { uploadRoute } from "../routes/upload.route";


export class RouteConfig {
  static configure(app: Express): void {
    // Configure routes
    app.use("/api/course", courseRoute);
    app.use("/api/upload/course", uploadRoute);
  }
}
