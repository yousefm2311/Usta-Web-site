export default function TestimonialCard({ name, role, quote }) {
  const initial = name?.trim()?.[0] || "؟";

  return (
    <div className="card card-luxe min-w-[260px] max-w-sm snap-start">
      <div className="flex items-center justify-between">
        <span className="chip">تجربة عميل</span>
        <span className="text-xs text-slate-400">★★★★★</span>
      </div>
      <p className="mt-4 text-sm text-slate-600">«{quote}»</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
          {initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
