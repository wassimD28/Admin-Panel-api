import { body } from "express-validator";

export const courseValidator = [
  body("name")
    .notEmpty()
    .withMessage("Course name is required")
    .bail()
    .isString()
    .withMessage("Course name must be a string")
    .bail(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail(),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .bail()
    .isNumeric()
    .withMessage("Price must be a number")
];
