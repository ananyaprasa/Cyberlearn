import { z } from "zod";
import mongoose from "mongoose";

// ObjectId validation schema
const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId format" }
);

export const createAssignmentSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title too long")
    .refine(val => val.trim().length > 0, "Title cannot be empty"),
  description: z.string()
    .max(2000, "Description too long")
    .optional()
    .default(""),
  category: z.enum(["OSINT", "Cryptography", "Network Security", "Reconnaissance", "General"])
    .optional()
    .default("General"),
  points: z.number()
    .min(1, "Points must be at least 1")
    .max(1000, "Points too high")
    .int("Points must be a whole number")
    .optional()
    .default(100),
  deadline: z.union([
    z.string().datetime({ message: "Invalid datetime format" }),
    z.date(),
    z.null()
  ]).optional(),
  classroomId: objectIdSchema.optional(),
  attachments: z.array(z.object({
    name: z.string().min(1, "Attachment name required"),
    url: z.string().url("Invalid URL format")
  })).optional().default([]),
  allowedFileTypes: z.array(z.string().regex(/^\.[a-zA-Z0-9]+$/, "Invalid file type format"))
    .optional()
    .default(['.pdf', '.doc', '.docx', '.txt']),
  allowLinks: z.boolean().optional().default(true)
});

export const updateAssignmentSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title too long")
    .refine(val => val.trim().length > 0, "Title cannot be empty")
    .optional(),
  description: z.string()
    .max(2000, "Description too long")
    .optional(),
  category: z.enum(["OSINT", "Cryptography", "Network Security", "Reconnaissance", "General"])
    .optional(),
  points: z.number()
    .min(1, "Points must be at least 1")
    .max(1000, "Points too high")
    .int("Points must be a whole number")
    .optional(),
  deadline: z.union([
    z.string().datetime({ message: "Invalid datetime format" }),
    z.date(),
    z.null()
  ]).optional(),
  attachments: z.array(z.object({
    name: z.string().min(1, "Attachment name required"),
    url: z.string().url("Invalid URL format")
  })).optional(),
  allowedFileTypes: z.array(z.string().regex(/^\.[a-zA-Z0-9]+$/, "Invalid file type format"))
    .optional(),
  allowLinks: z.boolean().optional()
});

export const assignmentQuerySchema = z.object({
  classroomId: objectIdSchema.optional()
});

export const assignmentParamsSchema = z.object({
  id: objectIdSchema
});