import { z } from "zod";

/**
 * Project Validation Schema
 * 
 */
export const CreateProjectSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long"),

  tech: z
    .array(z.string().min(1))
    .min(1, "At least one tech is required"),

  github: z
    .string()
    .url("GitHub must be a valid URL")
    .min(1, "GitHub link is required"),

  link: z
    .union([z.string().url(), z.literal(""), z.null()])
    .optional(),

  category: z
    .string()
    .min(2, "Category is required")
    .max(50, "Category is too long"),

  order: z
    .number()
    .int()
    .nonnegative(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
  id: z.string().uuid("ID must be a valid UUID"),
});

export const DeleteProjectSchema = z.object({
  id: z.string().uuid("ID must be a valid UUID"),
});

/**
 * Type inference for reuse in frontend/admin UI
 */
export type ProjectInput = z.infer<typeof CreateProjectSchema>;
export type ProjectUpdateInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectDeleteInput = z.infer<typeof DeleteProjectSchema>;