import {
  createCourse,
  updateCourse,
  getCourseById,
  getCourses,
  deleteCourse,
} from "../controllers/course.controller";
import { Router } from "express";
import { courseValidator } from "../validators/course.validator";
import { handleValidations } from "../middlewares/handleValidations.middleware";

const courseRoute = Router();
courseRoute.post("/", courseValidator, handleValidations, createCourse);
courseRoute.put("/:id", courseValidator, handleValidations, updateCourse);
courseRoute.get("/:id", getCourseById);
courseRoute.get("/", getCourses);
courseRoute.delete("/:id", deleteCourse);

export default courseRoute;
