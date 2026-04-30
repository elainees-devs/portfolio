import { prisma } from "@/lib/prisma";
import DataTable from "@/components/admin/data-table";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-gray-400 text-sm">
          Manage your portfolio projects
        </p>
      </div>

      {/* TABLE */}
      <DataTable
        data={projects}
        columns={[
          {
            header: "Title",
            accessor: (row) => (
              <div className="font-medium">{row.title}</div>
            ),
          },
          {
            header: "Category",
            accessor: (row) => (
              <span className="text-gray-400">
                {row.category}
              </span>
            ),
          },
          {
            header: "Tech Stack",
            accessor: (row) => (
              <div className="flex flex-wrap gap-1">
                {row.tech.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-800 text-xs rounded"
                  >
                    {t}
                  </span>
                ))}
                {row.tech.length > 3 && (
                  <span className="text-gray-500 text-xs">
                    +{row.tech.length - 3}
                  </span>
                )}
              </div>
            ),
          },
          {
            header: "Links",
            accessor: (row) => (
              <div className="flex gap-3 text-sm">
                <a
                  href={row.github}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>

                {row.link && (
                  <a
                    href={row.link}
                    target="_blank"
                    className="text-green-400 hover:underline"
                  >
                    Live
                  </a>
                )}
              </div>
            ),
          },
          {
            header: "Order",
            accessor: (row) => (
              <span className="text-gray-400">{row.order}</span>
            ),
          },
          {
            header: "Created",
            accessor: (row) => (
              <span className="text-gray-500 text-sm">
                {new Date(row.createdAt).toLocaleDateString()}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}