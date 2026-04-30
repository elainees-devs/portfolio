"use client";

import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

type NavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export default function NavItem({ label, href, icon: Icon }: NavItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  return (
    <button
      onClick={() => router.push(href)}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition
        ${
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:bg-gray-900"
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}