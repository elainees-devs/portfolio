"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ExperienceInput } from "@/lib/validators/experience";
import { CreateExperienceSchema } from "@/lib/validators/experience";

// Server Actions
import { createExperience } from "@/lib/actions/experience";

type ExperienceFormProps = {
  initialData?: Partial<ExperienceInput>;
  mode?: "create" | "edit";
};

export default function ExperienceForm({
  initialData,
  mode = "create",
}: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ExperienceInput>({
    resolver: zodResolver(CreateExperienceSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      organization: initialData?.organization ?? "",
      startDate: initialData?.startDate ?? "",
      endDate: initialData?.endDate ?? "",
      description: initialData?.description ?? [],
      order: initialData?.order ?? 0,
    } satisfies ExperienceInput,
  });

  const description = useWatch({
    control,
    name: "description",
  }) ?? [];

  const addPoint = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setValue("description", [...description, trimmed], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removePoint = (index: number) => {
    setValue(
      "description",
      description.filter((_, i) => i !== index),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  const onSubmit = async (data: ExperienceInput) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("organization", data.organization);
      formData.append("startDate", data.startDate);
      formData.append("order", String(data.order));

      if (data.endDate) {
        formData.append("endDate", data.endDate);
      }

      formData.append(
        "description",
        JSON.stringify(data.description)
      );

      await createExperience(formData);

      router.push("/admin/experience");
      router.refresh();
    } catch (err) {
      console.error("Experience form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl"
    >
      {/* Title */}
      <div>
        <label className="text-sm text-gray-400">Title</label>
        <input
          {...register("title")}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
        {errors.title && (
          <p className="text-red-400 text-sm">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Organization */}
      <div>
        <label className="text-sm text-gray-400">
          Organization
        </label>
        <input
          {...register("organization")}
          className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
        />
        {errors.organization && (
          <p className="text-red-400 text-sm">
            {errors.organization.message}
          </p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400">
            Start Date
          </label>
          <input
            {...register("startDate")}
            className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
          />
          {errors.startDate && (
            <p className="text-red-400 text-sm">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-400">
            End Date
          </label>
          <input
            {...register("endDate")}
            className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-400">
          Description Points
        </label>

        <div className="flex gap-2 mt-1">
          <input
            id="desc-input"
            className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded"
            placeholder="Add experience point"
          />

          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "desc-input"
              ) as HTMLInputElement;

              addPoint(input.value);
              input.value = "";
            }}
            className="px-3 bg-gray-800 rounded"
          >
            Add
          </button>
        </div>

        <div className="space-y-2 mt-2">
          {description.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-900 p-2 rounded"
            >
              <span className="text-sm text-gray-300">
                {item}
              </span>

              <button
                type="button"
                onClick={() => removePoint(i)}
                className="text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {errors.description && (
          <p className="text-red-400 text-sm">
            {errors.description.message}
          </p>
        )}
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
          ? "Create Experience"
          : "Update Experience"}
      </button>
    </form>
  );
}