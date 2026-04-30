export default function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="h-12 bg-gray-900 border border-gray-800 rounded"
        />
      ))}
    </div>
  );
}