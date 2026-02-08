export default function StatCard({ value, label }) {
  return (
    <div className="card card-muted card-luxe text-center">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-100" />
    </div>
  );
}
