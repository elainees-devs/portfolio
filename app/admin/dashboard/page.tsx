import { prisma } from "@/lib/prisma";
import { FolderKanban, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projectsCount, experienceCount] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
  ]);

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Overview of your portfolio content
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects Card */}
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-950">
          <div className="flex items-center gap-3">
            <FolderKanban className="text-blue-400" />
            <h2 className="text-lg font-semibold">Projects</h2>
          </div>

          <p className="text-3xl font-bold mt-4">{projectsCount}</p>
          <p className="text-gray-400 text-sm">
            Total projects in portfolio
          </p>
        </div>

        {/* Experience Card */}
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-950">
          <div className="flex items-center gap-3">
            <Briefcase className="text-green-400" />
            <h2 className="text-lg font-semibold">Experience</h2>
          </div>

          <p className="text-3xl font-bold mt-4">
            {experienceCount}
          </p>
          <p className="text-gray-400 text-sm">
            Work experience entries
          </p>
        </div>
      </div>

      {/* QUICK NAV */}
      <div className="border border-gray-800 rounded-lg p-6 bg-gray-950">
        <h3 className="text-lg font-semibold mb-4">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/dashboard/projects"
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
          >
            Manage Projects
          </a>

          <a
            href="/admin/dashboard/experience"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            Manage Experience
          </a>
        </div>
      </div>
    </div>
  );
}