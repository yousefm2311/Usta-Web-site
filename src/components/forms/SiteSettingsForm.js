"use client";

import { useEffect, useState } from "react";

const emptySettings = {
  heroTitle: "",
  heroSubtitle: "",
  ctaPrimaryText: "",
  ctaPrimaryUrl: "",
  ctaSecondaryText: "",
  ctaSecondaryUrl: "",
  androidUrl: "",
  iosUrl: "",
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    whatsapp: ""
  },
  stats: []
};

export default function SiteSettingsForm() {
  const [settings, setSettings] = useState(emptySettings);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => null);
  }, []);

  const updateField = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field, value) => {
    setSettings((prev) => ({ ...prev, socials: { ...prev.socials, [field]: value } }));
  };

  const updateStat = (index, field, value) => {
    const stats = [...(settings.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    setSettings((prev) => ({ ...prev, stats }));
  };

  const addStat = () => {
    setSettings((prev) => ({ ...prev, stats: [...(prev.stats || []), { label: "", value: "" }] }));
  };

  const removeStat = (index) => {
    const stats = [...(settings.stats || [])];
    stats.splice(index, 1);
    setSettings((prev) => ({ ...prev, stats }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const payload = {
      ...settings,
      stats: (settings.stats || []).filter((item) => item.label?.trim() && item.value?.trim())
    };

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setStatus({ type: "success", message: "تم تحديث الإعدادات بنجاح." });
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "تعذر حفظ الإعدادات." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="card">
        <h2 className="text-lg font-semibold">قسم البطل</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">العنوان الرئيسي</label>
            <input className="input mt-2" value={settings.heroTitle} onChange={(e) => updateField("heroTitle", e.target.value)} />
          </div>
          <div>
            <label className="label">الوصف</label>
            <textarea className="input mt-2" rows="3" value={settings.heroSubtitle} onChange={(e) => updateField("heroSubtitle", e.target.value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">زر رئيسي</label>
              <input className="input mt-2" value={settings.ctaPrimaryText} onChange={(e) => updateField("ctaPrimaryText", e.target.value)} />
            </div>
            <div>
              <label className="label">رابط الزر الرئيسي</label>
              <input className="input mt-2" value={settings.ctaPrimaryUrl} onChange={(e) => updateField("ctaPrimaryUrl", e.target.value)} />
            </div>
            <div>
              <label className="label">زر ثانوي</label>
              <input className="input mt-2" value={settings.ctaSecondaryText} onChange={(e) => updateField("ctaSecondaryText", e.target.value)} />
            </div>
            <div>
              <label className="label">رابط الزر الثانوي</label>
              <input className="input mt-2" value={settings.ctaSecondaryUrl} onChange={(e) => updateField("ctaSecondaryUrl", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold">روابط التحميل</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Android</label>
            <input className="input mt-2" value={settings.androidUrl} onChange={(e) => updateField("androidUrl", e.target.value)} />
          </div>
          <div>
            <label className="label">iOS</label>
            <input className="input mt-2" value={settings.iosUrl} onChange={(e) => updateField("iosUrl", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold">الأرقام المهمة</h2>
        <div className="mt-4 space-y-3">
          {(settings.stats || []).map((stat, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-[2fr_1fr_auto]">
              <input className="input" placeholder="العنوان" value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value)} />
              <input className="input" placeholder="القيمة" value={stat.value} onChange={(e) => updateStat(index, "value", e.target.value)} />
              <button type="button" onClick={() => removeStat(index)} className="btn-outline">حذف</button>
            </div>
          ))}
          <button type="button" onClick={addStat} className="btn-outline">إضافة رقم</button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold">روابط التواصل الاجتماعي</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input className="input" placeholder="Facebook" value={settings.socials.facebook || ""} onChange={(e) => updateSocial("facebook", e.target.value)} />
          <input className="input" placeholder="Instagram" value={settings.socials.instagram || ""} onChange={(e) => updateSocial("instagram", e.target.value)} />
          <input className="input" placeholder="TikTok" value={settings.socials.tiktok || ""} onChange={(e) => updateSocial("tiktok", e.target.value)} />
          <input className="input" placeholder="YouTube" value={settings.socials.youtube || ""} onChange={(e) => updateSocial("youtube", e.target.value)} />
          <input className="input" placeholder="WhatsApp" value={settings.socials.whatsapp || ""} onChange={(e) => updateSocial("whatsapp", e.target.value)} />
        </div>
      </div>

      {status && <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
    </form>
  );
}
