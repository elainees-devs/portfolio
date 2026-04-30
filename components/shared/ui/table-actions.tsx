"use client";

import { useTransition } from "react";
import { Trash2, Pencil } from "lucide-react";

type Props = {
  id: string;
  editPath: string;
  onDelete: (id: string) => Promise<void>;
};

export default function TableActions({
  id,
  editPath,
  onDelete,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await onDelete(id);
    });
  };

  return (
    <div className="flex items-center gap-3">
      {/* EDIT */}
      <a
        href={`${editPath}/${id}`}
        className="text-blue-400 hover:text-blue-300"
      >
        <Pencil size={16} />
      </a>

      {/* DELETE */}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-400 hover:text-red-300 disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}