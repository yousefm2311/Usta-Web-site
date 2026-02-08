import Image from "next/image";
import Link from "next/link";

export default function Footer({ settings }) {
  const socials = settings?.socials || {};
  const socialLinks = [
    { key: "facebook", label: "Facebook", href: socials.facebook },
    { key: "instagram", label: "Instagram", href: socials.instagram },
    { key: "tiktok", label: "TikTok", href: socials.tiktok },
    { key: "youtube", label: "YouTube", href: socials.youtube },
    { key: "whatsapp", label: "WhatsApp", href: socials.whatsapp }
  ].filter((item) => item.href);

  return (
    <footer className="relative border-t border-blue-100 bg-[color:var(--theme-surface)]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--theme-accent)] to-transparent opacity-40" />
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-lg font-bold">
            <span className="relative h-10 w-10">
              <Image src="/logo_svg.svg" alt="Usta logo" fill sizes="40px" className="logo-image object-contain" />
            </span>
            <span className="relative h-6 w-28 sm:w-32">
              <Image src="/text_logo_svg.svg" alt="Usta wordmark" fill sizes="128px" className="logo-image object-contain" />
            </span>
            <span className="sr-only">Usta</span>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            {settings?.footerDescription || "أضف وصف الفوتر من لوحة التحكم."}
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-600">
          <p className="text-sm font-semibold text-slate-800">روابط سريعة</p>
          <Link href="/about">من نحن</Link>
          <Link href="/services">الخدمات</Link>
          <Link href="/blog">المدونة</Link>
          <Link href="/contact">تواصل معنا</Link>
          <Link href="/privacy">سياسة الخصوصية</Link>
          <Link href="/terms">الشروط والأحكام</Link>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">تابعنا</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.length ? (
              socialLinks.map((link) => (
                <a key={link.key} href={link.href} target="_blank" rel="noreferrer" className="badge">
                  {link.label}
                </a>
              ))
            ) : (
              <span className="text-sm text-slate-500">أضف روابط التواصل من لوحة التحكم.</span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100 py-4 text-center text-xs text-slate-500">
        جميع الحقوق محفوظة © {new Date().getFullYear()} Usta
      </div>
    </footer>
  );
}
