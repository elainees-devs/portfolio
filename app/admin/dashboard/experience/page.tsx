import { prisma } from "@/lib/prisma";
import DataTable from "@/components/admin/data-table";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Experience</h1>
        <p className="text-gray-400 text-sm">
          Manage your work experience timeline
        </p>
      </div>

      {/* TABLE */}
      <DataTable
        data={experiences}
        columns={[
          {
            header: "Title",
            accessor: (row) => (
              <div className="font-medium">{row.title}</div>
            ),
          },
          {
            header: "Organization",
            accessor: (row) => (
              <div className="text-gray-400">
                {row.organization}
              </div>
            ),
          },
          {
            header: "Duration",
            accessor: (row) => (
              <div className="text-gray-400 text-sm">
                {row.startDate} - {row.endDate || "Present"}
              </div>
            ),
          },
          {
            header: "Description",
            accessor: (row) => (
              <ul className="list-disc pl-4 text-sm text-gray-300">
                {row.description.slice(0, 2).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                {row.description.length > 2 && (
                  <li className="text-gray-500">
                    +{row.description.length - 2} more
                  </li>
                )}
              </ul>
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
                {format(new Date(row.createdAt), "MMM yyyy")}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}