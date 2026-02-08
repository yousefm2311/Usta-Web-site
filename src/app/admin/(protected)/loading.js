export default function AdminLoading() {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="skeleton shimmer h-8 w-48 rounded-2xl" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton shimmer h-28 rounded-3xl" />
          ))}
        </div>
        <div className="skeleton shimmer h-64 rounded-3xl" />
      </div>
    </div>
  );
}
