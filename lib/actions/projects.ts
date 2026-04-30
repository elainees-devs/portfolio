"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
  CreateProjectSchema,
  UpdateProjectSchema,
  DeleteProjectSchema,
} from "@/lib/validators/project";

// ==============================
// GET PROJECTS
// ==============================
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    return { success: true, data: projects };
  } catch (_error) {
    console.error("GET_PROJECTS_ERROR:", _error);

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
export async function createProject(formData: FormData) {
  try {
    const raw = Object.fromEntries(formData.entries());

    const parsed = CreateProjectSchema.parse({
      ...raw,
      tech: JSON.parse(raw.tech as string),
      order: raw.order ? Number(raw.order) : 0,
    });

    await prisma.project.create({
      data: parsed,
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (_error) {
    console.error("CREATE_PROJECT_ERROR:", _error);

    return {
      success: false,
      error: "Failed to create project",
    };
  }
}

// ==============================
// UPDATE PROJECT
// ==============================
export async function updateProject(formData: FormData) {
  try {
    const raw = Object.fromEntries(formData.entries());

    const parsed = UpdateProjectSchema.parse({
      ...raw,
      tech: raw.tech ? JSON.parse(raw.tech as string) : undefined,
      order: raw.order ? Number(raw.order) : undefined,
    });

    const { id, ...data } = parsed;

    await prisma.project.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (_error) {
    console.error("UPDATE_PROJECT_ERROR:", _error);

    return {
      success: false,
      error: "Failed to update project",
    };
  }
}

// ==============================
// DELETE PROJECT
// ==============================
export async function deleteProject(formData: FormData) {
  try {
    const raw = Object.fromEntries(formData.entries());

    const { id } = DeleteProjectSchema.parse(raw);

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");

    return { success: true };
  } catch (_error) {
    console.error("DELETE_PROJECT_ERROR:", _error);

    return {
      success: false,
      error: "Failed to delete project",
    };
  }
}