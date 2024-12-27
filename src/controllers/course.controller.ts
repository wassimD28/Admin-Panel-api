import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course from "../models/course.model";
import { ApiResponse } from "../types/interfaces/common.interface";

// Create a new course
export const createCourse = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const course = await Course.create({ name, description, price });
  const response: ApiResponse = {
    success: true,
    message: "Course created successfully",
    data: course,
  };
  res.status(201).json(response);
});

// Get all courses
export const getCourses = asyncHandler(async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  const response: ApiResponse = {
    success: true,
    message: "Courses retrieved successfully",
    data: courses,
  };
  res.status(200).json(response);
});

// Get a single course by ID
export const getCourseById = asyncHandler(async (req: Request, res: Response) => {
  const course_id = req.params.id;
  const course = await Course.findByPk(course_id);
  let response: ApiResponse;
  // check if course exists
  if (!course) {
    response = {
      success: false,
      message: "Course not found",
    };
    res.status(404).json(response);
    return;
  }
  
  response = {
    success: true,
    message: "Course retrieved successfully",
    data: course,
  };
});

// Update a course by ID
export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const course_id = req.params.id;
  const course = await Course.findByPk(course_id);
  let response: ApiResponse;
  // check if course exists
  if (!course) {
    response = {
      success: false,
      message: "Course not found",
    };
    res.status(404).json(response);
    return;
  }

  await course.update({ name, description, price });
  response = {
    success: true,
    message: "Course updated successfully",
    data: course,
  };
  res.status(200).json(response);
});

// Delete a course by ID
export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
  const course_id = req.params.id;
  const course = await Course.findByPk(course_id);
  let response: ApiResponse;
  // check if course exists
  if (!course) {
    response = {
      success: false,
      message: "Course not found",
    };
    res.status(404).json(response);
    return;
  }

  await course.destroy();
  response = {
    success: true,
    message: "Course deleted successfully",
  };
  res.status(200).json(response);
});
