import { z } from "zod";

/**
 * Project Validation Schema
 */
export const CreateProjectSchema = z.object({
  title: z.string().min(2).max(100),

  description: z.string().min(10).max(1000),

  tech: z.array(z.string().min(1)).min(1),

  images: z.array(
    z.object({
      url: z.string().url(),
      key: z.string().optional(),
    })
  ),

  github: z.string().url().min(1),

  link: z.union([z.string().url(), z.literal(""), z.null()]).optional(),

  category: z.string().min(2).max(50),

  order: z.number().int().nonnegative(),
});

/**
 * Update schema
 */
export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
  id: z.string().cuid(), //better than uuid if using Prisma cuid()
});

/**
 * Delete schema
 */
export const DeleteProjectSchema = z.object({
  id: z.string().cuid(),
});

/**
 * Types
 */
export type ProjectInput = z.infer<typeof CreateProjectSchema>;
export type ProjectUpdateInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectDeleteInput = z.infer<typeof DeleteProjectSchema>;