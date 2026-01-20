"use client";

import { useEffect, useState } from "react";
import { applyTheme } from "@/components/ThemeApplier";

const emptyTheme = {
  name: "",
  slug: "",
  tokens: {
    primary: "#3b82f6",
    primaryLight: "#dbeafe",
    primaryDark: "#1d4ed8",
    accent: "#38bdf8",
    background: "#f8fafc",
    surface: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    border: "#e2e8f0",
    gradientFrom: "#eff6ff",
    gradientTo: "#f8fafc",
    radius: "24px",
    ring: "rgba(59, 130, 246, 0.25)",
    fontFamily: ""
  }
};

const presetThemes = [
  {
    name: "أزرق عصري",
    slug: "blue-modern",
    tokens: {
      primary: "#3b82f6",
      primaryLight: "#dbeafe",
      primaryDark: "#1d4ed8",
      accent: "#38bdf8",
      background: "#f8fafc",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#64748b",
      border: "#e2e8f0",
      gradientFrom: "#eff6ff",
      gradientTo: "#f8fafc",
      radius: "24px",
      ring: "rgba(59, 130, 246, 0.25)",
      fontFamily: ""
    }
  },
  {
    name: "رملي دافئ",
    slug: "sand-warm",
    tokens: {
      primary: "#c08427",
      primaryLight: "#fef3c7",
      primaryDark: "#92400e",
      accent: "#f59e0b",
      background: "#fffbf5",
      surface: "#ffffff",
      text: "#3f2f1b",
      muted: "#7c6f63",
      border: "#eadfcb",
      gradientFrom: "#fff1db",
      gradientTo: "#fffbf5",
      radius: "22px",
      ring: "rgba(192, 132, 39, 0.25)",
      fontFamily: ""
    }
  },
  {
    name: "نعناعي هادئ",
    slug: "mint-soft",
    tokens: {
      primary: "#10b981",
      primaryLight: "#d1fae5",
      primaryDark: "#047857",
      accent: "#14b8a6",
      background: "#f0fdf4",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#64748b",
      border: "#d1fae5",
      gradientFrom: "#ecfdf5",
      gradientTo: "#f0fdf4",
      radius: "22px",
      ring: "rgba(16, 185, 129, 0.25)",
      fontFamily: ""
    }
  },
  {
    name: "ليلي أنيق",
    slug: "midnight",
    tokens: {
      primary: "#6366f1",
      primaryLight: "#e0e7ff",
      primaryDark: "#4338ca",
      accent: "#22d3ee",
      background: "#0f172a",
      surface: "#111827",
      text: "#f8fafc",
      muted: "#cbd5f5",
      border: "#1f2937",
      gradientFrom: "#0b1120",
      gradientTo: "#111827",
      radius: "20px",
      ring: "rgba(99, 102, 241, 0.3)",
      fontFamily: ""
    }
  }
  ,
  {
    name: "بنفسجي ملكي",
    slug: "royal-purple",
    tokens: {
      primary: "#7c3aed",
      primaryLight: "#ede9fe",
      primaryDark: "#5b21b6",
      accent: "#c084fc",
      background: "#f8f5ff",
      surface: "#ffffff",
      text: "#1f1b2e",
      muted: "#6b7280",
      border: "#e7ddff",
      gradientFrom: "#f3e8ff",
      gradientTo: "#f8f5ff",
      radius: "22px",
      ring: "rgba(124, 58, 237, 0.25)",
      fontFamily: ""
    }
  },
  {
    name: "فيروزي بحري",
    slug: "ocean-teal",
    tokens: {
      primary: "#0ea5e9",
      primaryLight: "#e0f2fe",
      primaryDark: "#0369a1",
      accent: "#06b6d4",
      background: "#f0f9ff",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#64748b",
      border: "#bae6fd",
      gradientFrom: "#e0f2fe",
      gradientTo: "#f0f9ff",
      radius: "24px",
      ring: "rgba(14, 165, 233, 0.25)",
      fontFamily: ""
    }
  },
  {
    name: "وردي مخملي",
    slug: "velvet-rose",
    tokens: {
      primary: "#ec4899",
      primaryLight: "#fce7f3",
      primaryDark: "#be185d",
      accent: "#fb7185",
      background: "#fff5f7",
      surface: "#ffffff",
      text: "#2b1b24",
      muted: "#7c6f77",
      border: "#fbcfe8",
      gradientFrom: "#fce7f3",
      gradientTo: "#fff5f7",
      radius: "22px",
      ring: "rgba(236, 72, 153, 0.22)",
      fontFamily: ""
    }
  }
];

export default function ThemesManager() {
  const [themes, setThemes] = useState([]);
  const [form, setForm] = useState(emptyTheme);
  const [editingId, setEditingId] = useState(null);
  const [jsonInput, setJsonInput] = useState("");
  const [status, setStatus] = useState(null);

  const loadThemes = () => {
    fetch("/api/admin/themes")
      .then((res) => res.json())
      .then((data) => setThemes(data.items || []));
  };

  useEffect(() => {
    loadThemes();
  }, []);

  const updateToken = (field, value) => {
    setForm((prev) => ({ ...prev, tokens: { ...prev.tokens, [field]: value } }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    let payload = form;

    if (jsonInput.trim()) {
      try {
        const parsed = JSON.parse(jsonInput);
        payload = {
          name: parsed.name || form.name,
          slug: parsed.slug || form.slug,
          tokens: { ...form.tokens, ...(parsed.tokens || {}) }
        };
      } catch (error) {
        setStatus({ type: "error", message: "صيغة JSON غير صحيحة" });
        return;
      }
    }

    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/api/admin/themes/${editingId}` : "/api/admin/themes";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setStatus({ type: "success", message: "تم حفظ الثيم." });
      setForm(emptyTheme);
      setEditingId(null);
      setJsonInput("");
      loadThemes();
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "تعذر حفظ الثيم." });
    }
  };

  const installPresets = async () => {
    setStatus(null);
    const results = await Promise.all(
      presetThemes.map(async (preset) => {
        const res = await fetch("/api/admin/themes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preset)
        });
        return res.ok;
      })
    );
    const added = results.filter(Boolean).length;
    setStatus({
      type: "success",
      message: `تمت إضافة ${added} ثيمات جاهزة.`
    });
    loadThemes();
  };

  const handleEdit = (theme) => {
    setForm({
      name: theme.name,
      slug: theme.slug,
      tokens: { ...emptyTheme.tokens, ...theme.tokens }
    });
    setEditingId(theme._id);
    setJsonInput("");
  };

  const applyPreset = (preset) => {
    setForm({
      name: preset.name,
      slug: preset.slug,
      tokens: { ...emptyTheme.tokens, ...preset.tokens }
    });
    setEditingId(null);
    setJsonInput("");
  };

  const handleActivate = async (id) => {
    setStatus(null);
    const res = await fetch(`/api/admin/themes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activate: true })
    });
    if (!res.ok) {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "تعذر تفعيل الثيم." });
      return;
    }
    const theme = await res.json();
    localStorage.setItem("usta-theme", JSON.stringify(theme));
    window.dispatchEvent(new Event("theme:update"));
    applyTheme(theme);
    setStatus({ type: "success", message: "تم تفعيل الثيم." });
    loadThemes();
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف الثيم؟")) return;
    await fetch(`/api/admin/themes/${id}`, { method: "DELETE" });
    loadThemes();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="text-lg font-semibold">{editingId ? "تعديل الثيم" : "ثيم جديد"}</h2>
        <div>
          <p className="label">ثيمات جاهزة</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {presetThemes.map((preset) => (
              <button
                key={preset.slug}
                type="button"
                className="btn-outline"
                onClick={() => applyPreset(preset)}
              >
                {preset.name}
              </button>
            ))}
          </div>
          <button type="button" className="btn-primary mt-4" onClick={installPresets}>
            إضافة كل الثيمات الجاهزة
          </button>
        </div>
        <div>
          <label className="label">اسم الثيم</label>
          <input className="input mt-2" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        </div>
        <div>
          <label className="label">Slug (اختياري)</label>
          <input className="input mt-2" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">اللون الأساسي</label>
            <input className="input mt-2" value={form.tokens.primary} onChange={(e) => updateToken("primary", e.target.value)} />
          </div>
          <div>
            <label className="label">اللون الأساسي الفاتح</label>
            <input className="input mt-2" value={form.tokens.primaryLight} onChange={(e) => updateToken("primaryLight", e.target.value)} />
          </div>
          <div>
            <label className="label">اللون الأساسي الداكن</label>
            <input className="input mt-2" value={form.tokens.primaryDark} onChange={(e) => updateToken("primaryDark", e.target.value)} />
          </div>
          <div>
            <label className="label">لون مساعد</label>
            <input className="input mt-2" value={form.tokens.accent} onChange={(e) => updateToken("accent", e.target.value)} />
          </div>
          <div>
            <label className="label">خلفية</label>
            <input className="input mt-2" value={form.tokens.background} onChange={(e) => updateToken("background", e.target.value)} />
          </div>
          <div>
            <label className="label">سطح البطاقات</label>
            <input className="input mt-2" value={form.tokens.surface} onChange={(e) => updateToken("surface", e.target.value)} />
          </div>
          <div>
            <label className="label">نص أساسي</label>
            <input className="input mt-2" value={form.tokens.text} onChange={(e) => updateToken("text", e.target.value)} />
          </div>
          <div>
            <label className="label">نص ثانوي</label>
            <input className="input mt-2" value={form.tokens.muted} onChange={(e) => updateToken("muted", e.target.value)} />
          </div>
          <div>
            <label className="label">حدود</label>
            <input className="input mt-2" value={form.tokens.border} onChange={(e) => updateToken("border", e.target.value)} />
          </div>
          <div>
            <label className="label">تدرج من</label>
            <input className="input mt-2" value={form.tokens.gradientFrom} onChange={(e) => updateToken("gradientFrom", e.target.value)} />
          </div>
          <div>
            <label className="label">تدرج إلى</label>
            <input className="input mt-2" value={form.tokens.gradientTo} onChange={(e) => updateToken("gradientTo", e.target.value)} />
          </div>
          <div>
            <label className="label">نصف القطر</label>
            <input className="input mt-2" value={form.tokens.radius} onChange={(e) => updateToken("radius", e.target.value)} />
          </div>
          <div>
            <label className="label">لون التحديد</label>
            <input className="input mt-2" value={form.tokens.ring} onChange={(e) => updateToken("ring", e.target.value)} />
          </div>
          <div>
            <label className="label">خط مخصص (اختياري)</label>
            <input className="input mt-2" value={form.tokens.fontFamily} onChange={(e) => updateToken("fontFamily", e.target.value)} />
          </div>
        </div>

        <div>
          <label className="label">JSON للثيم (اختياري)</label>
          <textarea className="input mt-2" rows="4" placeholder='{"name":"...","slug":"...","tokens":{...}}' value={jsonInput} onChange={(e) => setJsonInput(e.target.value)}></textarea>
        </div>

        {status && <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}
        <button type="submit" className="btn-primary">حفظ</button>
      </form>

      <div className="card">
        <h2 className="text-lg font-semibold">الثيمات الحالية</h2>
        <div className="mt-4 space-y-4">
          {themes.map((theme) => (
            <div key={theme._id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{theme.name}</p>
                  <p className="text-xs text-slate-500">/{theme.slug}</p>
                </div>
                {theme.isActive && <span className="badge">نشط</span>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className="btn-outline" onClick={() => handleEdit(theme)}>تعديل</button>
                <button type="button" className="btn-outline" onClick={() => handleActivate(theme._id)}>تفعيل</button>
                <button type="button" className="btn-outline" onClick={() => handleDelete(theme._id)}>حذف</button>
              </div>
            </div>
          ))}
          {!themes.length && <p className="text-sm text-slate-500">لا توجد ثيمات بعد.</p>}
        </div>
      </div>
    </div>
  );
}
