import "./globals.css";
import { Cairo } from "next/font/google";
import ThemeApplier from "@/components/ThemeApplier";
import { getThemeMode, normalizeThemeTokens } from "@/lib/themeMode";
import { getActiveTheme } from "@/services/themeService";

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
  const tokens = normalizeThemeTokens(theme?.tokens || {});
  const themeStyle = {
    "--theme-primary": tokens.primary || "#0b3b39",
    "--theme-primary-light": tokens.primaryLight || "#d6eee9",
    "--theme-primary-dark": tokens.primaryDark || "#062b29",
    "--theme-accent": tokens.accent || "#d6a657",
    "--theme-background": tokens.background || "#f7f3ee",
    "--theme-surface": tokens.surface || "#fcfbf9",
    "--theme-text": tokens.text || "#1c1b1a",
    "--theme-muted": tokens.muted || "#6f6a63",
    "--theme-border": tokens.border || "#e5ddd1",
    "--theme-gradient-from": tokens.gradientFrom || "#f6efe7",
    "--theme-gradient-to": tokens.gradientTo || "#f9f6f2",
    "--theme-radius": tokens.radius || "22px",
    "--theme-ring": tokens.ring || "rgba(11, 59, 57, 0.22)",
    "--theme-font": tokens.fontFamily || "var(--font-plex)"
  };
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable}`}
      style={{
        ...themeStyle,
        "--theme-font": tokens.fontFamily || "var(--font-cairo)",
        "--theme-font-display": tokens.fontDisplay || "var(--font-cairo)"
      }}
      data-theme-mode={getThemeMode(tokens)}
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
