"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}