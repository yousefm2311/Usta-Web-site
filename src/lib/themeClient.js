"use client";

import { getThemeMode, normalizeThemeTokens } from "./themeMode";

const applyTheme = (theme) => {
  if (!theme?.tokens) return;
  const root = document.documentElement;
  const tokens = normalizeThemeTokens(theme.tokens);

  root.style.setProperty("--theme-primary", tokens.primary || "#0b3b39");
  root.style.setProperty("--theme-primary-light", tokens.primaryLight || "#d6eee9");
  root.style.setProperty("--theme-primary-dark", tokens.primaryDark || "#062b29");
  root.style.setProperty("--theme-accent", tokens.accent || "#d6a657");
  root.style.setProperty("--theme-background", tokens.background || "#f7f3ee");
  root.style.setProperty("--theme-surface", tokens.surface || "#fcfbf9");
  root.style.setProperty("--theme-text", tokens.text || "#1c1b1a");
  root.style.setProperty("--theme-muted", tokens.muted || "#6f6a63");
  root.style.setProperty("--theme-border", tokens.border || "#e5ddd1");
  root.style.setProperty("--theme-gradient-from", tokens.gradientFrom || "#f6efe7");
  root.style.setProperty("--theme-gradient-to", tokens.gradientTo || "#f9f6f2");
  root.style.setProperty("--theme-radius", tokens.radius || "22px");
  root.style.setProperty("--theme-ring", tokens.ring || "rgba(11, 59, 57, 0.22)");
  root.style.setProperty("--theme-font", tokens.fontFamily || "var(--font-cairo)");
  root.style.setProperty("--theme-font-display", tokens.fontDisplay || "var(--font-cairo)");

  // Map Tailwind color variables to theme tokens for existing classes.
  root.style.setProperty("--color-blue-50", tokens.primaryLight || "#d6eee9");
  root.style.setProperty("--color-blue-100", tokens.primaryLight || "#d6eee9");
  root.style.setProperty("--color-blue-200", tokens.primaryLight || "#d6eee9");
  root.style.setProperty("--color-blue-500", tokens.primary || "#0b3b39");
  root.style.setProperty("--color-blue-600", tokens.primary || "#0b3b39");
  root.style.setProperty("--color-blue-700", tokens.primaryDark || "#062b29");
  root.style.setProperty("--color-slate-50", tokens.background || "#f7f3ee");
  root.style.setProperty("--color-slate-200", tokens.border || "#e5ddd1");
  root.style.setProperty("--color-slate-500", tokens.muted || "#6f6a63");
  root.style.setProperty("--color-slate-600", tokens.muted || "#6f6a63");
  root.style.setProperty("--color-slate-700", tokens.text || "#1c1b1a");
  root.style.setProperty("--color-slate-900", tokens.text || "#1c1b1a");

  root.dataset.themeMode = getThemeMode(tokens);
};

export { applyTheme };
