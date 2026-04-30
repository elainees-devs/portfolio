"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
  CreateExperienceSchema,
  UpdateExperienceSchema,
  DeleteExperienceSchema,
} from "@/lib/validators/experience";

// ==============================
// GET EXPERIENCE
// ==============================
export async function getExperience() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    return { success: true, data: experience };
  } catch (_error) {
    console.error("GET_EXPERIENCE_ERROR:", _error);

    return {
      success: false,
      data: [],
      error: "Failed to fetch experience",
    };
  }
}

// ==============================
// CREATE EXPERIENCE
// ==============================
export async function createExperience(formData: FormData) {
  try {
    const raw = Object.fromEntries(formData.entries());

    const parsed = CreateExperienceSchema.parse({
      ...raw,
      description: JSON.parse(raw.description as string),
      order: raw.order ? Number(raw.order) : 0,
      endDate: raw.endDate || null,
    });

    await prisma.experience.create({
      data: parsed,
    });

    revalidatePath("/");
    revalidatePath("/admin/experience");

    return { success: true };
  } catch (_error) {
    console.error("CREATE_EXPERIENCE_ERROR:", _error);

    return {
      success: false,
      error: "Failed to create experience",
    };
  }
}

// ==============================
// UPDATE EXPERIENCE
// ==============================
export async function updateExperience(formData: FormData) {
  try {
    const raw = Object.fromEntries(formData.entries());

    const parsed = UpdateExperienceSchema.parse({
      ...raw,
      description: raw.description
        ? JSON.parse(raw.description as string)
        : undefined,
      order: raw.order ? Number(raw.order) : undefined,
      endDate: raw.endDate === "" ? null : raw.endDate,
    });

    const { id, ...data } = parsed;

    await prisma.experience.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/experience");

    return { success: true };
  } catch (_error) {
    console.error("UPDATE_EXPERIENCE_ERROR:", _error);

    return {
      success: false,
      error: "Failed to update experience",
    };
  }
}

// ==============================
// DELETE EXPERIENCE
// ==============================
export async function deleteExperience(formData: FormData) {
  try {
    const raw = Object.fromEntries(formData.entries());

    const { id } = DeleteExperienceSchema.parse(raw);

    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/experience");

    return { success: true };
  } catch (_error) {
    console.error("DELETE_EXPERIENCE_ERROR:", _error);

    return {
      success: false,
      error: "Failed to delete experience",
    };
  }
}