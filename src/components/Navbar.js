import Link from "next/link";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "الخدمات" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل" }
];

export default function Navbar({ settings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-[color:var(--theme-surface)] backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">U</span>
          Usta
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href={settings?.ctaSecondaryUrl || "/contact"} className="btn-outline">
            {settings?.ctaSecondaryText || "انضم كحرفي"}
          </Link>
          <Link href={settings?.ctaPrimaryUrl || "/download"} className="btn-primary">
            {settings?.ctaPrimaryText || "حمّل التطبيق"}
          </Link>
        </div>
        <details className="md:hidden">
          <summary className="cursor-pointer rounded-full border border-blue-100 px-4 py-2 text-sm">القائمة</summary>
          <div className="absolute left-4 right-4 mt-3 rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] p-4 shadow-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700">
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link href={settings?.ctaPrimaryUrl || "/download"} className="btn-primary">
                  {settings?.ctaPrimaryText || "حمّل التطبيق"}
                </Link>
                <Link href={settings?.ctaSecondaryUrl || "/contact"} className="btn-outline">
                  {settings?.ctaSecondaryText || "انضم كحرفي"}
                </Link>
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
