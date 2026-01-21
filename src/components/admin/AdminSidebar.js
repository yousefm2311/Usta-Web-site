"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const adminLinks = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/site-settings", label: "إعدادات الموقع" },
  { href: "/admin/categories", label: "الأقسام" },
  { href: "/admin/blog", label: "المدونة" },
  { href: "/admin/themes", label: "الثيمات" },
  { href: "/admin/messages", label: "الرسائل" },
  { href: "/admin/pages", label: "الصفحات الثابتة" },
  { href: "/admin/users", label: "المستخدمون" }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href) => {
    if (!pathname) return false;
    if (href === "/admin") return pathname === "/admin" || pathname.startsWith("/admin/");
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const navLinkClass = (active) => `admin-nav-link${active ? " admin-nav-link-active" : ""}`;

  return (
    <aside className="hidden w-64 flex-col border-l border-blue-100 bg-[color:var(--theme-surface)] p-6 md:flex">
      <Link href="/admin" className="mb-8 flex items-center gap-3 text-lg font-bold" aria-label="Usta admin">
        <span className="relative h-12 w-10">
          <Image src="/logo_svg.svg" alt="Usta logo" fill sizes="40px" className="logo-image object-contain" priority />
        </span>
        <span className="relative h-5 w-28">
          <Image src="/text_logo_svg.svg" alt="Usta wordmark" fill sizes="110px" className="logo-image object-contain" priority />
        </span>
        <span className="sr-only">Usta</span>
      </Link>
      <nav className="flex flex-col gap-2">
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
      </nav>
    </aside>
  );
}
