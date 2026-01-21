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
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-[color:var(--theme-surface)] backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Usta">
          <span className="relative h-12 w-10">
            <Image src="/logo_svg.svg" alt="Usta logo" fill sizes="40px" className="logo-image object-contain" priority />
          </span>
          <span className="relative h-4 w-28 sm:w-32">
            <Image src="/text_logo_svg.svg" alt="Usta wordmark" fill sizes="128px" className="logo-image object-contain" priority />
          </span>
          <span className="sr-only">Usta</span>
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
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
