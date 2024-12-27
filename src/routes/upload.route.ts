import { deleteCourseImageController, uploadCourseImageController } from "../controllers/upload.controller";
import { Router } from "express";

export const uploadRoute = Router();

uploadRoute.post("/:id/image", uploadCourseImageController);
uploadRoute.delete("/:id/image", deleteCourseImageController)