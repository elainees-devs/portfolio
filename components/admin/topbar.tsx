"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "@/components/admin/logout-button";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-gray-800 px-6 flex items-center justify-between bg-gray-950">
      {/* ================= LEFT ================= */}
      <div className="text-sm text-gray-400">
        <span className="text-white font-medium">
          {session?.user?.name || "Admin"}
        </span>
        <span className="ml-2">
          / Dashboard
        </span>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-4">
        {/* Future: search / notifications / quick actions */}

        {/* Logout */}
        <LogoutButton />
      </div>
    </header>
  );
}