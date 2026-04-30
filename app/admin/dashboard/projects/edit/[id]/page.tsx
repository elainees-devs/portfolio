import ProjectForm from "@/components/admin/project-form";
import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

      <ProjectForm
        mode="edit"
        initialData={{
          title: project.title,
          description: project.description,
          tech: project.tech,
          github: project.github,
          link: project.link ?? "",
          category: project.category,
          order: project.order,
        }}
      />
    </div>
  );
}