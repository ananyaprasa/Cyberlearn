import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long")
    .refine(val => val.trim().length >= 2, "Name cannot be empty or whitespace only")
    .optional(),
  email: z.string()
    .email("Invalid email format")
    .max(100, "Email too long")
    .optional()
});