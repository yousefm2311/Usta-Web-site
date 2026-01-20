import "./globals.css";
import { Cairo } from "next/font/google";
import { getActiveTheme } from "@/services/themeService";
import ThemeApplier from "@/components/ThemeApplier";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo"
});

export const metadata = {
  title: {
    default: "Usta | منصة الحرفيين",
    template: "%s | Usta"
  },
  description: "Usta منصة تربط العملاء بأفضل الحرفيين بسرعة وموثوقية.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Usta | منصة الحرفيين",
    description: "Usta منصة تربط العملاء بأفضل الحرفيين بسرعة وموثوقية.",
    type: "website"
  }
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const theme = await getActiveTheme();
  const tokens = theme?.tokens || {};
  const themeStyle = {
    "--theme-primary": tokens.primary || "#3b82f6",
    "--theme-primary-light": tokens.primaryLight || "#dbeafe",
    "--theme-primary-dark": tokens.primaryDark || "#1d4ed8",
    "--theme-accent": tokens.accent || "#38bdf8",
    "--theme-background": tokens.background || "#f8fafc",
    "--theme-surface": tokens.surface || "#ffffff",
    "--theme-text": tokens.text || "#0f172a",
    "--theme-muted": tokens.muted || "#64748b",
    "--theme-border": tokens.border || "#e2e8f0",
    "--theme-gradient-from": tokens.gradientFrom || "#eff6ff",
    "--theme-gradient-to": tokens.gradientTo || "#f8fafc",
    "--theme-radius": tokens.radius || "24px",
    "--theme-ring": tokens.ring || "rgba(59, 130, 246, 0.25)",
    "--theme-font": tokens.fontFamily || "var(--font-cairo)"
  };
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} style={themeStyle}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
