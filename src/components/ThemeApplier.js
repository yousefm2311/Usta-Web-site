"use client";

import { useEffect } from "react";

const applyTheme = (theme) => {
  if (!theme?.tokens) return;
  const root = document.documentElement;
  const tokens = theme.tokens;

  root.style.setProperty("--theme-primary", tokens.primary || "#3b82f6");
  root.style.setProperty("--theme-primary-light", tokens.primaryLight || "#dbeafe");
  root.style.setProperty("--theme-primary-dark", tokens.primaryDark || "#1d4ed8");
  root.style.setProperty("--theme-accent", tokens.accent || "#38bdf8");
  root.style.setProperty("--theme-background", tokens.background || "#f8fafc");
  root.style.setProperty("--theme-surface", tokens.surface || "#ffffff");
  root.style.setProperty("--theme-text", tokens.text || "#0f172a");
  root.style.setProperty("--theme-muted", tokens.muted || "#64748b");
  root.style.setProperty("--theme-border", tokens.border || "#e2e8f0");
  root.style.setProperty("--theme-gradient-from", tokens.gradientFrom || "#eff6ff");
  root.style.setProperty("--theme-gradient-to", tokens.gradientTo || "#f8fafc");
  root.style.setProperty("--theme-radius", tokens.radius || "24px");
  root.style.setProperty("--theme-ring", tokens.ring || "rgba(59, 130, 246, 0.25)");
  root.style.setProperty("--theme-font", tokens.fontFamily || "var(--font-cairo)");

  // Map Tailwind color variables to theme tokens for existing classes.
  root.style.setProperty("--color-blue-50", tokens.primaryLight || "#dbeafe");
  root.style.setProperty("--color-blue-100", tokens.primaryLight || "#dbeafe");
  root.style.setProperty("--color-blue-200", tokens.primaryLight || "#dbeafe");
  root.style.setProperty("--color-blue-500", tokens.primary || "#3b82f6");
  root.style.setProperty("--color-blue-600", tokens.primary || "#3b82f6");
  root.style.setProperty("--color-blue-700", tokens.primaryDark || "#1d4ed8");
  root.style.setProperty("--color-slate-50", tokens.background || "#f8fafc");
  root.style.setProperty("--color-slate-200", tokens.border || "#e2e8f0");
  root.style.setProperty("--color-slate-500", tokens.muted || "#64748b");
  root.style.setProperty("--color-slate-600", tokens.muted || "#64748b");
  root.style.setProperty("--color-slate-700", tokens.text || "#0f172a");
  root.style.setProperty("--color-slate-900", tokens.text || "#0f172a");
};

export default function ThemeApplier() {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const cached = localStorage.getItem("usta-theme");
        if (cached) {
          applyTheme(JSON.parse(cached));
        }
        const res = await fetch("/api/public/theme", { cache: "no-store" });
        const theme = await res.json();
        applyTheme(theme);
        localStorage.setItem("usta-theme", JSON.stringify(theme));
      } catch (error) {
        // Ignore theme fetch errors on client.
      }
    };

    const handleStorage = (event) => {
      if (event.key === "usta-theme" && event.newValue) {
        applyTheme(JSON.parse(event.newValue));
      }
    };

    const handleCustom = () => {
      const cached = localStorage.getItem("usta-theme");
      if (cached) {
        applyTheme(JSON.parse(cached));
      }
    };

    loadTheme();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("theme:update", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("theme:update", handleCustom);
    };
  }, []);

  return null;
}

export { applyTheme };
