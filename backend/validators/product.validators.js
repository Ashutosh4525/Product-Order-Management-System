import { body,param } from "express-validator";

export const Productvalidator=[
    body("name").notEmpty().withMessage("Name is required"),
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("price").notEmpty().withMessage("Price is required"),
]

export const Productparams=[
    param("id").notEmpty().withMessage("Id should not be empty")
]