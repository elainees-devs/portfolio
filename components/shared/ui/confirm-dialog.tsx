"use client";

import { useState } from "react";

type Props = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "default";
  onConfirm: () => Promise<void> | void;
  children: (open: () => void) => React.ReactNode;
};

export default function ConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {children(() => setOpen(true))}

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-[90%] max-w-md space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-400 text-sm">{description}</p>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 text-gray-300 hover:text-white"
              >
                {cancelText}
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`
                  px-3 py-1 rounded text-white transition
                  ${
                    variant === "danger"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-white text-black hover:bg-gray-200"
                  }
                `}
              >
                {loading ? "Processing..." : confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}