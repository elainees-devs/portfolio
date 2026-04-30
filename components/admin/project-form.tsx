"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ProjectInput } from "@/lib/validators/project";
import { CreateProjectSchema } from "@/lib/validators/project";

// Server Actions
import { createProject } from "@/lib/actions/projects";

type ProjectFormProps = {
  initialData?: Partial<ProjectInput>;
  mode?: "create" | "edit";
};

export default function ProjectForm({
  initialData,
  mode = "create",
}: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      tech: initialData?.tech ?? [],
      github: initialData?.github ?? "",
      link: initialData?.link ?? "",
      category: initialData?.category ?? "",
      order: initialData?.order ?? 0,
    } satisfies ProjectInput,
  });


  const tech = useWatch({
    control,
    name: "tech",
  }) ?? [];

  const addTech = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setValue("tech", [...tech, trimmed], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeTech = (index: number) => {
    setValue(
      "tech",
      tech.filter((_, i) => i !== index),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  const onSubmit = async (data: ProjectInput) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("github", data.github);
      formData.append("category", data.category);
      formData.append("order", String(data.order));

      if (data.link) {
        formData.append("link", data.link);
      }

      formData.append("tech", JSON.stringify(data.tech));

      await createProject(formData);

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error("Project form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Title */}
      <div>
        <label className="text-sm text-gray-400">Title</label>
        <input
          {...register("title")}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
        {errors.title && (
          <p className="text-red-400 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-400">Description</label>
        <textarea
          {...register("description")}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
        {errors.description && (
          <p className="text-red-400 text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Tech Stack */}
      <div>
        <label className="text-sm text-gray-400">Tech Stack</label>

        <div className="flex gap-2 mt-1">
          <input
            id="tech-input"
            className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded"
            placeholder="Add technology"
          />

          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "tech-input"
              ) as HTMLInputElement;

              addTech(input.value);
              input.value = "";
            }}
            className="px-3 bg-gray-800 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-800 rounded text-sm flex items-center gap-2"
            >
              {t}
              <button
                type="button"
                onClick={() => removeTech(i)}
                className="text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {errors.tech && (
          <p className="text-red-400 text-sm">{errors.tech.message}</p>
        )}
      </div>

      {/* GitHub */}
      <div>
        <label className="text-sm text-gray-400">GitHub</label>
        <input
          {...register("github")}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
        {errors.github && (
          <p className="text-red-400 text-sm">{errors.github.message}</p>
        )}
      </div>

      {/* Live Link */}
      <div>
        <label className="text-sm text-gray-400">Live Link</label>
        <input
          {...register("link")}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm text-gray-400">Category</label>
        <input
          {...register("category")}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
      </div>

      {/* Order */}
      <div>
        <label className="text-sm text-gray-400">Order</label>
        <input
          type="number"
          {...register("order", { valueAsNumber: true })}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Create Project"
          : "Update Project"}
      </button>
    </form>
  );
}