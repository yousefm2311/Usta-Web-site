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
    <footer className="border-t border-blue-100 bg-[color:var(--theme-surface)]">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">U</span>
            Usta
          </div>
          <p className="mt-4 text-sm text-slate-600">
            منصة عربية للحرفيين والعملاء، نوفر تجربة طلب خدمة سلسة وآمنة.
          </p>
        </div>
        <div className="space-y-2 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">روابط سريعة</p>
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
