import { z } from "zod";
import mongoose from "mongoose";

// ObjectId validation schema
const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId format" }
);

export const createClassroomSchema = z.object({
  name: z.string()
    .min(1, "Classroom name is required")
    .max(100, "Name too long")
    .refine(val => val.trim().length > 0, "Name cannot be empty"),
  description: z.string()
    .max(500, "Description too long")
    .optional()
    .default(""),
  subject: z.string()
    .max(50, "Subject too long")
    .optional()
    .default("Cybersecurity")
});

export const joinClassroomSchema = z.object({
  code: z.string()
    .length(6, "Join code must be exactly 6 characters")
    .regex(/^[A-Z0-9]+$/, "Join code must contain only uppercase letters and numbers")
});

export const classroomParamsSchema = z.object({
  id: objectIdSchema
});