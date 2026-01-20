export default function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] p-6 text-center shadow-sm">
      <p className="text-2xl font-bold text-blue-700">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
    </div>
  );
}
