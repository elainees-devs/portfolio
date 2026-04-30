import { z } from "zod";

/**
 * Experience Validation Schema
 * 
 */
export const CreateExperienceSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),

  organization: z
    .string()
    .min(2, "Organization is required")
    .max(100, "Organization is too long"),

  startDate: z
    .string()
    .min(1, "Start date is required"),

  endDate: z
    .union([z.string(), z.null()])
    .optional(),

  description: z
    .array(z.string().min(1, "Description item cannot be empty"))
    .min(1, "At least one description point is required"),

  order: z      
    .number()
    .int()
    .nonnegative()
});

export const UpdateExperienceSchema = CreateExperienceSchema.partial().extend({
  id: z.string().min(1, "ID is required for update"),
});

export const DeleteExperienceSchema = z.object({
  id: z.string().min(1, "ID is required for deletion"),
});

/**
 * Type inference for frontend/admin reuse
 */
export type ExperienceInput = z.infer<typeof CreateExperienceSchema>;
export type ExperienceUpdateInput = z.infer<typeof UpdateExperienceSchema>;
export type ExperienceDeleteInput = z.infer<typeof DeleteExperienceSchema>;