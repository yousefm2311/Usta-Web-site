"use client";

import { useEffect } from "react";
import { applyTheme } from "@/lib/themeClient";

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
