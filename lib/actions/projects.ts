"use server";
import { prisma } from "@/lib/prisma";

import {
  CreateProjectSchema,
  UpdateProjectSchema,
  DeleteProjectSchema,
} from "@/lib/validators/project";

type ProjectImageInput = {
  url: string;
  key?: string;
};

// ==============================
// GET PROJECTS
// ==============================
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
      include: {
        images: true,
      },
    });

    return { success: true, data: projects };
  } catch (error) {
    console.error("GET_PROJECTS_ERROR:", error);

    return {
      success: false,
      data: [],
      error: "Failed to fetch projects",
    };
  }
}

// ==============================
// CREATE PROJECT
// ==============================
export async function createProject(input: unknown) {
  try {
    const parsed = CreateProjectSchema.parse(input);

    const project = await prisma.project.create({
      data: {
        ...parsed,

        images: {
          create: parsed.images.map((img: ProjectImageInput) => ({
            url: img.url,
            key: img.key,
          })),
        },
      },
    });

    return { success: true, data: project };
  } catch (error) {
    console.error("CREATE_PROJECT_ERROR:", error);

    return {
      success: false,
      error: "Failed to create project",
    };
  }
}

// ==============================
// UPDATE PROJECT
// ==============================
export async function updateProject(input: unknown) {
  try {
    const parsed = UpdateProjectSchema.parse(input);

    const { id, ...data } = parsed;

    await prisma.project.update({
      where: { id },
      data: {
        ...data,

        images: parsed.images
          ? {
              deleteMany: {},
              create: parsed.images.map((img: ProjectImageInput) => ({
                url: img.url,
                key: img.key,
              })),
            }
          : undefined,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("UPDATE_PROJECT_ERROR:", error);

    return {
      success: false,
      error: "Failed to update project",
    };
  }
}

// ==============================
// DELETE PROJECT
// ==============================
export async function deleteProject(input: unknown) {
  try {
    const { id } = DeleteProjectSchema.parse(input);

    await prisma.project.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("DELETE_PROJECT_ERROR:", error);

    return {
      success: false,
      error: "Failed to delete project",
    };
  }
}