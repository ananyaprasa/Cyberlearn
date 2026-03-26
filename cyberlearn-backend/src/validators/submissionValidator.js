import { z } from "zod";
import mongoose from "mongoose";

// ObjectId validation schema
const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId format" }
);

export const createSubmissionSchema = z.object({
  assignmentId: objectIdSchema,
  textAnswer: z.string()
    .max(5000, "Text answer too long")
    .optional()
    .default(""),
  linkAnswer: z.union([
    z.string().url("Invalid URL format"),
    z.literal(""),
    z.null()
  ]).optional().default(""),
  files: z.array(z.object({
    name: z.string().min(1, "File name required"),
    url: z.string().url("Invalid file URL"),
    size: z.number().min(0, "File size cannot be negative").optional()
  })).optional().default([])
}).refine(
  (data) => data.textAnswer || data.linkAnswer || (data.files && data.files.length > 0),
  { message: "At least one answer type (text, link, or file) is required" }
);

export const gradeSubmissionSchema = z.object({
  grade: z.union([
    z.number().min(0, "Grade cannot be negative"),
    z.null()
  ]).optional(),
  feedback: z.string()
    .max(2000, "Feedback too long")
    .optional()
    .default("")
});

export const submissionQuerySchema = z.object({
  assignment: objectIdSchema.optional()
});

export const submissionParamsSchema = z.object({
  id: objectIdSchema,
  userId: objectIdSchema.optional()
});