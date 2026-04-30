import ExperienceForm from "@/components/admin/experience-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditExperiencePage({ params }: Props) {
  const experience = await prisma.experience.findUnique({
    where: { id: params.id },
  });

  if (!experience) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Experience</h1>

      <ExperienceForm
        mode="edit"
        initialData={{
          title: experience.title,
          organization: experience.organization,
          startDate: experience.startDate,
          endDate: experience.endDate ?? null,
          description: experience.description,
          order: experience.order,
        }}
      />
    </div>
  );
}