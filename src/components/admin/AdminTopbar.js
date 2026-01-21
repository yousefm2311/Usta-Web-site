"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { adminLinks } from "@/components/admin/AdminSidebar";

export default function AdminTopbar({ title }) {
  const pathname = usePathname();
  const isActive = (href) => {
    if (!pathname) return false;
    if (href === "/admin") return pathname === "/admin" || pathname.startsWith("/admin/");
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const navLinkClass = (active) => `admin-nav-link${active ? " admin-nav-link-active" : ""}`;

  return (
    <div className="flex flex-col gap-3 border-b border-blue-100 bg-[color:var(--theme-surface)] px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        <details className="relative md:hidden">
          <summary className="cursor-pointer rounded-full border border-blue-100 px-4 py-2 text-sm">القائمة</summary>
          <nav className="absolute left-0 right-0 z-30 mt-3 rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] p-3 shadow-xl">
            <div className="flex flex-col gap-2">
              {adminLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClass(active)}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </details>
      </div>
      <button type="button" onClick={() => signOut({ callbackUrl: "/admin/login" })} className="btn-outline">
        تسجيل الخروج
      </button>
    </div>
  );
}
