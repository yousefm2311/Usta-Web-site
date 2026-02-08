"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "الخدمات" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل" }
];

export default function Navbar({ settings }) {
  const pathname = usePathname();
  const isActive = (href) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const navLinkClass = (active) => `nav-link${active ? " nav-link-active" : ""}`;

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 surface-glass shadow-sm">
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Usta">
          <span className="relative h-12 w-10">
            <Image src="/logo_svg.svg" alt="Usta logo" fill sizes="40px" className="logo-image object-contain" priority />
          </span>
          <span className="relative h-4 w-28 sm:w-32">
            <Image src="/text_logo_svg.svg" alt="Usta wordmark" fill sizes="128px" className="logo-image object-contain" priority />
          </span>
          <span className="sr-only">Usta</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-blue-100 surface-glass px-2 py-1 md:flex">
          {navLinks.map((link) => {
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

        <div className="hidden items-center gap-2 md:flex">
          <Link href={settings?.ctaSecondaryUrl || "/contact"} className="btn-outline">
            {settings?.ctaSecondaryText || "انضم كحرفي"}
          </Link>
          <Link href={settings?.ctaPrimaryUrl || "/download"} className="btn-primary">
            {settings?.ctaPrimaryText || "حمّل التطبيق"}
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary className="btn-ghost list-none border border-blue-100 px-4">القائمة</summary>
          <div className="absolute right-0 top-full z-50 mt-3 max-h-[70vh] w-[min(92vw,360px)] overflow-auto rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] p-4 shadow-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${navLinkClass(active)} block w-full`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-2">
                <Link href={settings?.ctaPrimaryUrl || "/download"} className="btn-primary w-full justify-center">
                  {settings?.ctaPrimaryText || "حمّل التطبيق"}
                </Link>
                <Link href={settings?.ctaSecondaryUrl || "/contact"} className="btn-outline w-full justify-center">
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
