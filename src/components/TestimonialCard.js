export default function TestimonialCard({ name, role, quote }) {
  return (
    <div className="card min-w-[260px] max-w-sm snap-start">
      <p className="text-sm text-slate-600">“{quote}”</p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  );
}
