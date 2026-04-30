"use client";

import { ReactNode } from "react";

type Column<T> = {
  header: string;
  accessor: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
};

export default function DataTable<T>({
  data,
  columns,
  emptyMessage = "No data found",
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-gray-800 rounded-lg">
      <table className="w-full text-sm text-left">
        {/* HEADER */}
        <thead className="bg-gray-900 text-gray-300">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3">
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}