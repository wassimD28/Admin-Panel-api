import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { singleImageUploader } from "../utils/handleUpload.util";
import path from "path";
import Course from "../models/course.model";
import { ApiResponse } from "../types/interfaces/common.interface";

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

export const uploadCourseImageController = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;

      // Validate required parameters
      if (!id) {
        const response: ApiResponse = {
          success: false,
          message: "Course ID is required",
        };
        res.status(400).json(response);
        return;
      }

      // Find the entity record
      const existedCourse = await Course.findByPk(id);
      if (!existedCourse) {
        const response: ApiResponse = {
          success: false,
          message: "Course not found",
        };
        res.status(404).json(response);
        return;
      }

      // Configure upload middleware
      const uploadPath = path.join(
        process.cwd(),
        "uploads",
        "course",
        id,
        "image"
      );
      const uploadMiddleware = singleImageUploader(uploadPath, "image");

      // Handle the upload
      uploadMiddleware(req, res, async (err) => {
        if (err) {
          const response: ApiResponse = {
            success: false,
            message: err.message,
          };
          res.status(400).json(response);
          return;
        }

        const multerReq = req as MulterRequest;
        if (!multerReq.file) {
          const response: ApiResponse = {
            success: false,
            message: "No file uploaded",
          };
          res.status(400).json(response);
          return;
        }

        try {
          // Get the file path relative to the project root
          const relativeFilePath = path.join(
            "uploads",
            "course",
            id,
            "image",
            multerReq.file.filename
          );

          // Get the existing file path
          const existingFile = existedCourse.get("image") as string | undefined;

          // Delete existing file if it exists
          if (existingFile) {
            const existingFilePath = path.join(process.cwd(), existingFile);
            if (fs.existsSync(existingFilePath)) {
              fs.unlinkSync(existingFilePath);
            }
          }

          // Update the course with the new file path
          await existedCourse.update({
            image: relativeFilePath,
          });

          const response: ApiResponse = {
            success: true,
            message: "Image uploaded successfully",
            data: existedCourse,
          };
          res.status(200).json(response);
        } catch (error) {
          // Clean up uploaded file if database update fails
          if (multerReq.file) {
            fs.unlink(multerReq.file.path, (err) => {
              if (err)
                console.error(
                  `Error deleting file ${multerReq.file.path}:`,
                  err
                );
            });
          }

          const response: ApiResponse = {
            success: false,
            message: "Image upload failed",
          };
          res.status(500).json(response);
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

export const deleteCourseImageController = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;

      // Validate required parameters
      if (!id) {
        const response: ApiResponse = {
          success: false,
          message: "Course ID is required",
        };
        res.status(400).json(response);
        return;
      }

      // Find the entity record
      const existedCourse = await Course.findByPk(id);
      if (!existedCourse) {
        const response: ApiResponse = {
          success: false,
          message: "Course not found",
        };
        res.status(404).json(response);
        return;
      }

      // Get the existing file path
      const existingFile = existedCourse.get("image") as string | undefined;

      // If no image exists
      if (!existingFile) {
        const response: ApiResponse = {
          success: false,
          message: "Course has no image to delete",
        };
        res.status(404).json(response);
        return;
      }

      try {
        // Delete the file
        const existingFilePath = path.join(process.cwd(), existingFile);
        if (fs.existsSync(existingFilePath)) {
          fs.unlinkSync(existingFilePath);
        }

        // Update the course to remove the image reference
        await existedCourse.update({
          image: null,
        });

        // Try to remove the empty directory
        const dirPath = path.join(
          process.cwd(),
          "uploads",
          "course",
          id,
          "image"
        );
        if (fs.existsSync(dirPath)) {
          fs.rmdirSync(dirPath, { recursive: true });
        }

        const response: ApiResponse = {
          success: true,
          message: "Image deleted successfully",
          data: existedCourse,
        };
        res.status(200).json(response);
      } catch (error) {
        const response: ApiResponse = {
          success: false,
          message: "Failed to delete image",
        };
        res.status(500).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
);
