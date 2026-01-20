"use client";

import { signOut } from "next-auth/react";

export default function AdminTopbar({ title }) {
  return (
    <div className="flex flex-col gap-3 border-b border-blue-100 bg-[color:var(--theme-surface)] px-6 py-4 md:flex-row md:items-center md:justify-between">
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      <button type="button" onClick={() => signOut({ callbackUrl: "/admin/login" })} className="btn-outline">
        تسجيل الخروج
      </button>
    </div>
  );
}
