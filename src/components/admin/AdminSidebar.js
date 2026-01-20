import Link from "next/link";

const adminLinks = [
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
  return (
    <aside className="hidden w-64 flex-col border-l border-blue-100 bg-[color:var(--theme-surface)] p-6 md:flex">
      <Link href="/admin" className="mb-8 flex items-center gap-2 text-lg font-bold">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">U</span>
        لوحة Usta
      </Link>
      <nav className="flex flex-col gap-3 text-sm text-slate-600">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-xl px-3 py-2 transition hover:bg-blue-50">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
