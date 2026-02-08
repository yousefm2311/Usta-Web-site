"use client";

import { useEffect, useState } from "react";

const emptySettings = {
  heroTitle: "",
  heroSubtitle: "",
  heroKicker: "",
  heroChips: [],
  heroCardBadge: "",
  heroCardStatus: "",
  heroCardTitle: "",
  heroCardDescription: "",
  heroCardTrend: "",
  heroCardArrivalLabel: "",
  heroCardArrivalValue: "",
  trustText: "",
  trustBadges: [],
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
  stats: [],
  homeServicesKicker: "",
  homeServicesTitle: "",
  homeServicesSubtitle: "",
  homeServicesButtonText: "",
  homeWhyKicker: "",
  homeWhyTitle: "",
  homeHowKicker: "",
  homeHowTitle: "",
  homeTestimonialsKicker: "",
  homeTestimonialsTitle: "",
  homeFaqKicker: "",
  homeFaqTitle: "",
  homeFaqSubtitle: "",
  homeBlogKicker: "",
  homeBlogTitle: "",
  homeBlogButtonText: "",
  homeCtaTitle: "",
  homeCtaSubtitle: "",
  homeHighlights: [],
  homeSteps: [],
  homeTestimonials: [],
  homeFaqs: [],
  aboutKicker: "",
  aboutTitle: "",
  aboutSubtitle: "",
  aboutChips: [],
  aboutPromiseTitle: "",
  aboutPromiseBody: "",
  aboutPromiseStats: [],
  aboutMissionTitle: "",
  aboutMissionBody: "",
  aboutVisionTitle: "",
  aboutVisionBody: "",
  aboutValuesKicker: "",
  aboutValuesTitle: "",
  aboutValues: [],
  servicesPageKicker: "",
  servicesPageTitle: "",
  servicesPageSubtitle: "",
  servicesStepsKicker: "",
  servicesStepsTitle: "",
  servicesSteps: [],
  servicesCategoriesKicker: "",
  servicesCategoriesTitle: "",
  servicesChipText: "",
  serviceDetailKicker: "",
  serviceDetailStepsKicker: "",
  serviceDetailStepsTitle: "",
  serviceDetailSteps: [],
  serviceDetailGuaranteesTitle: "",
  serviceDetailGuarantees: [],
  serviceDetailCtaTitle: "",
  serviceDetailCtaSubtitle: "",
  serviceDetailCtaButton: "",
  contactKicker: "",
  contactTitle: "",
  contactSubtitle: "",
  contactEmail: "",
  contactNote: "",
  contactCards: [],
  downloadKicker: "",
  downloadTitle: "",
  downloadSubtitle: "",
  downloadPerks: [],
  downloadCardTitle: "",
  downloadCardBody: "",
  downloadBullets: [],
  downloadAndroidLabel: "",
  downloadIosLabel: "",
  blogKicker: "",
  blogTitle: "",
  blogSubtitle: "",
  footerDescription: ""
};

const sanitizeList = (list) => (list || []).map((item) => `${item || ""}`.trim()).filter(Boolean);
const sanitizeObjects = (list, requiredFields) =>
  (list || []).filter((item) => requiredFields.every((field) => `${item?.[field] || ""}`.trim()));

export default function SiteSettingsForm() {
  const [settings, setSettings] = useState(emptySettings);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => setSettings({ ...emptySettings, ...data }))
      .catch(() => null);
  }, []);

  const updateField = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field, value) => {
    setSettings((prev) => ({ ...prev, socials: { ...prev.socials, [field]: value } }));
  };

  const updateArrayItem = (field, index, key, value) => {
    const items = [...(settings[field] || [])];
    items[index] = { ...items[index], [key]: value };
    setSettings((prev) => ({ ...prev, [field]: items }));
  };

  const addArrayItem = (field, item) => {
    setSettings((prev) => ({ ...prev, [field]: [...(prev[field] || []), item] }));
  };

  const removeArrayItem = (field, index) => {
    const items = [...(settings[field] || [])];
    items.splice(index, 1);
    setSettings((prev) => ({ ...prev, [field]: items }));
  };

  const updateStringItem = (field, index, value) => {
    const items = [...(settings[field] || [])];
    items[index] = value;
    setSettings((prev) => ({ ...prev, [field]: items }));
  };

  const addStringItem = (field) => {
    setSettings((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeStringItem = (field, index) => {
    const items = [...(settings[field] || [])];
    items.splice(index, 1);
    setSettings((prev) => ({ ...prev, [field]: items }));
  };

  const updateStat = (index, field, value, key = "stats") => {
    const stats = [...(settings[key] || [])];
    stats[index] = { ...stats[index], [field]: value };
    setSettings((prev) => ({ ...prev, [key]: stats }));
  };

  const addStat = (key = "stats") => {
    setSettings((prev) => ({ ...prev, [key]: [...(prev[key] || []), { label: "", value: "" }] }));
  };

  const removeStat = (index, key = "stats") => {
    const stats = [...(settings[key] || [])];
    stats.splice(index, 1);
    setSettings((prev) => ({ ...prev, [key]: stats }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const payload = {
      ...settings,
      stats: sanitizeObjects(settings.stats, ["label", "value"]),
      heroChips: sanitizeList(settings.heroChips),
      trustBadges: sanitizeList(settings.trustBadges),
      homeHighlights: sanitizeObjects(settings.homeHighlights, ["title", "description"]),
      homeSteps: sanitizeObjects(settings.homeSteps, ["title", "description"]),
      homeTestimonials: sanitizeObjects(settings.homeTestimonials, ["name", "role", "quote"]),
      homeFaqs: sanitizeObjects(settings.homeFaqs, ["question", "answer"]),
      aboutChips: sanitizeList(settings.aboutChips),
      aboutPromiseStats: sanitizeObjects(settings.aboutPromiseStats, ["label", "value"]),
      aboutValues: sanitizeList(settings.aboutValues),
      servicesSteps: sanitizeObjects(settings.servicesSteps, ["title", "description"]),
      serviceDetailSteps: sanitizeList(settings.serviceDetailSteps),
      serviceDetailGuarantees: sanitizeList(settings.serviceDetailGuarantees),
      contactCards: sanitizeObjects(settings.contactCards, ["title", "description"]),
      downloadPerks: sanitizeList(settings.downloadPerks),
      downloadBullets: sanitizeList(settings.downloadBullets)
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
          <div>
            <label className="label">الشارة العلوية</label>
            <input className="input mt-2" value={settings.heroKicker} onChange={(e) => updateField("heroKicker", e.target.value)} />
          </div>
          <div>
            <label className="label">الشرائح الصغيرة</label>
            <div className="mt-2 space-y-3">
              {(settings.heroChips || []).map((chip, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={chip} onChange={(e) => updateStringItem("heroChips", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("heroChips", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("heroChips")} className="btn-outline">إضافة شريحة</button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">نص زر رئيسي</label>
              <input className="input mt-2" value={settings.ctaPrimaryText} onChange={(e) => updateField("ctaPrimaryText", e.target.value)} />
            </div>
            <div>
              <label className="label">رابط الزر الرئيسي</label>
              <input className="input mt-2" value={settings.ctaPrimaryUrl} onChange={(e) => updateField("ctaPrimaryUrl", e.target.value)} />
            </div>
            <div>
              <label className="label">نص زر ثانوي</label>
              <input className="input mt-2" value={settings.ctaSecondaryText} onChange={(e) => updateField("ctaSecondaryText", e.target.value)} />
            </div>
            <div>
              <label className="label">رابط الزر الثانوي</label>
              <input className="input mt-2" value={settings.ctaSecondaryUrl} onChange={(e) => updateField("ctaSecondaryUrl", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">شارة البطاقة</label>
              <input className="input mt-2" value={settings.heroCardBadge} onChange={(e) => updateField("heroCardBadge", e.target.value)} />
            </div>
            <div>
              <label className="label">حالة البطاقة</label>
              <input className="input mt-2" value={settings.heroCardStatus} onChange={(e) => updateField("heroCardStatus", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان البطاقة</label>
              <input className="input mt-2" value={settings.heroCardTitle} onChange={(e) => updateField("heroCardTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">وصف البطاقة</label>
              <input className="input mt-2" value={settings.heroCardDescription} onChange={(e) => updateField("heroCardDescription", e.target.value)} />
            </div>
            <div>
              <label className="label">نص النمو</label>
              <input className="input mt-2" value={settings.heroCardTrend} onChange={(e) => updateField("heroCardTrend", e.target.value)} />
            </div>
            <div>
              <label className="label">وقت الوصول</label>
              <input className="input mt-2" value={settings.heroCardArrivalLabel} onChange={(e) => updateField("heroCardArrivalLabel", e.target.value)} />
            </div>
            <div>
              <label className="label">قيمة وقت الوصول</label>
              <input className="input mt-2" value={settings.heroCardArrivalValue} onChange={(e) => updateField("heroCardArrivalValue", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">نص الثقة</label>
            <textarea className="input mt-2" rows="2" value={settings.trustText} onChange={(e) => updateField("trustText", e.target.value)} />
          </div>
          <div>
            <label className="label">شارات الثقة</label>
            <div className="mt-2 space-y-3">
              {(settings.trustBadges || []).map((badge, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={badge} onChange={(e) => updateStringItem("trustBadges", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("trustBadges", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("trustBadges")} className="btn-outline">إضافة شارة</button>
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
          <button type="button" onClick={() => addStat()} className="btn-outline">إضافة رقم</button>
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

      <div className="card">
        <h2 className="text-lg font-semibold">محتوى الصفحة الرئيسية</h2>
        <details className="mt-4 space-y-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">عناوين الأقسام</summary>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">عنوان الخدمات</label>
              <input className="input mt-2" value={settings.homeServicesTitle} onChange={(e) => updateField("homeServicesTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">كلمة الخدمات</label>
              <input className="input mt-2" value={settings.homeServicesKicker} onChange={(e) => updateField("homeServicesKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">وصف الخدمات</label>
              <input className="input mt-2" value={settings.homeServicesSubtitle} onChange={(e) => updateField("homeServicesSubtitle", e.target.value)} />
            </div>
            <div>
              <label className="label">نص زر الخدمات</label>
              <input className="input mt-2" value={settings.homeServicesButtonText} onChange={(e) => updateField("homeServicesButtonText", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان لماذا Usta</label>
              <input className="input mt-2" value={settings.homeWhyTitle} onChange={(e) => updateField("homeWhyTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">كلمة لماذا Usta</label>
              <input className="input mt-2" value={settings.homeWhyKicker} onChange={(e) => updateField("homeWhyKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان كيف تعمل</label>
              <input className="input mt-2" value={settings.homeHowTitle} onChange={(e) => updateField("homeHowTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">كلمة كيف تعمل</label>
              <input className="input mt-2" value={settings.homeHowKicker} onChange={(e) => updateField("homeHowKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان آراء العملاء</label>
              <input className="input mt-2" value={settings.homeTestimonialsTitle} onChange={(e) => updateField("homeTestimonialsTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">كلمة آراء العملاء</label>
              <input className="input mt-2" value={settings.homeTestimonialsKicker} onChange={(e) => updateField("homeTestimonialsKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان الأسئلة الشائعة</label>
              <input className="input mt-2" value={settings.homeFaqTitle} onChange={(e) => updateField("homeFaqTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">كلمة الأسئلة الشائعة</label>
              <input className="input mt-2" value={settings.homeFaqKicker} onChange={(e) => updateField("homeFaqKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">وصف الأسئلة الشائعة</label>
              <input className="input mt-2" value={settings.homeFaqSubtitle} onChange={(e) => updateField("homeFaqSubtitle", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان المدونة</label>
              <input className="input mt-2" value={settings.homeBlogTitle} onChange={(e) => updateField("homeBlogTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">كلمة المدونة</label>
              <input className="input mt-2" value={settings.homeBlogKicker} onChange={(e) => updateField("homeBlogKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">نص زر المدونة</label>
              <input className="input mt-2" value={settings.homeBlogButtonText} onChange={(e) => updateField("homeBlogButtonText", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان CTA</label>
              <input className="input mt-2" value={settings.homeCtaTitle} onChange={(e) => updateField("homeCtaTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">وصف CTA</label>
              <input className="input mt-2" value={settings.homeCtaSubtitle} onChange={(e) => updateField("homeCtaSubtitle", e.target.value)} />
            </div>
          </div>
        </details>

        <details className="mt-6 space-y-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">مميزات المنصة</summary>
          <div className="mt-4 space-y-3">
            {(settings.homeHighlights || []).map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-[2fr_3fr_1fr_auto]">
                <input className="input" placeholder="العنوان" value={item.title} onChange={(e) => updateArrayItem("homeHighlights", index, "title", e.target.value)} />
                <input className="input" placeholder="الوصف" value={item.description} onChange={(e) => updateArrayItem("homeHighlights", index, "description", e.target.value)} />
                <input className="input" placeholder="الأيقونة" value={item.icon || ""} onChange={(e) => updateArrayItem("homeHighlights", index, "icon", e.target.value)} />
                <button type="button" onClick={() => removeArrayItem("homeHighlights", index)} className="btn-outline">حذف</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("homeHighlights", { title: "", description: "", icon: "" })} className="btn-outline">إضافة ميزة</button>
          </div>
        </details>

        <details className="mt-6 space-y-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">خطوات المنصة</summary>
          <div className="mt-4 space-y-3">
            {(settings.homeSteps || []).map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-[2fr_3fr_1fr_auto]">
                <input className="input" placeholder="العنوان" value={item.title} onChange={(e) => updateArrayItem("homeSteps", index, "title", e.target.value)} />
                <input className="input" placeholder="الوصف" value={item.description} onChange={(e) => updateArrayItem("homeSteps", index, "description", e.target.value)} />
                <input className="input" placeholder="الأيقونة" value={item.icon || ""} onChange={(e) => updateArrayItem("homeSteps", index, "icon", e.target.value)} />
                <button type="button" onClick={() => removeArrayItem("homeSteps", index)} className="btn-outline">حذف</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("homeSteps", { title: "", description: "", icon: "" })} className="btn-outline">إضافة خطوة</button>
          </div>
        </details>

        <details className="mt-6 space-y-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">شهادات العملاء</summary>
          <div className="mt-4 space-y-3">
            {(settings.homeTestimonials || []).map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-[1.2fr_1.2fr_2fr_auto]">
                <input className="input" placeholder="الاسم" value={item.name} onChange={(e) => updateArrayItem("homeTestimonials", index, "name", e.target.value)} />
                <input className="input" placeholder="الصفة" value={item.role} onChange={(e) => updateArrayItem("homeTestimonials", index, "role", e.target.value)} />
                <input className="input" placeholder="التقييم" value={item.quote} onChange={(e) => updateArrayItem("homeTestimonials", index, "quote", e.target.value)} />
                <button type="button" onClick={() => removeArrayItem("homeTestimonials", index)} className="btn-outline">حذف</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("homeTestimonials", { name: "", role: "", quote: "" })} className="btn-outline">إضافة رأي</button>
          </div>
        </details>

        <details className="mt-6 space-y-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">الأسئلة الشائعة</summary>
          <div className="mt-4 space-y-3">
            {(settings.homeFaqs || []).map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-[2fr_3fr_auto]">
                <input className="input" placeholder="السؤال" value={item.question} onChange={(e) => updateArrayItem("homeFaqs", index, "question", e.target.value)} />
                <input className="input" placeholder="الإجابة" value={item.answer} onChange={(e) => updateArrayItem("homeFaqs", index, "answer", e.target.value)} />
                <button type="button" onClick={() => removeArrayItem("homeFaqs", index)} className="btn-outline">حذف</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("homeFaqs", { question: "", answer: "" })} className="btn-outline">إضافة سؤال</button>
          </div>
        </details>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">صفحة من نحن</h2>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">الكلمة التعريفية</label>
              <input className="input mt-2" value={settings.aboutKicker} onChange={(e) => updateField("aboutKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">العنوان</label>
              <input className="input mt-2" value={settings.aboutTitle} onChange={(e) => updateField("aboutTitle", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">الوصف</label>
            <textarea className="input mt-2" rows="3" value={settings.aboutSubtitle} onChange={(e) => updateField("aboutSubtitle", e.target.value)} />
          </div>
          <div>
            <label className="label">شرائح التعريف</label>
            <div className="mt-2 space-y-3">
              {(settings.aboutChips || []).map((chip, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={chip} onChange={(e) => updateStringItem("aboutChips", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("aboutChips", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("aboutChips")} className="btn-outline">إضافة شريحة</button>
            </div>
          </div>

          <div>
            <label className="label">عنوان الوعد</label>
            <input className="input mt-2" value={settings.aboutPromiseTitle} onChange={(e) => updateField("aboutPromiseTitle", e.target.value)} />
          </div>
          <div>
            <label className="label">نص الوعد</label>
            <textarea className="input mt-2" rows="2" value={settings.aboutPromiseBody} onChange={(e) => updateField("aboutPromiseBody", e.target.value)} />
          </div>
          <div>
            <label className="label">أرقام الوعد</label>
            <div className="mt-2 space-y-3">
              {(settings.aboutPromiseStats || []).map((stat, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[2fr_1fr_auto]">
                  <input className="input" placeholder="العنوان" value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value, "aboutPromiseStats")} />
                  <input className="input" placeholder="القيمة" value={stat.value} onChange={(e) => updateStat(index, "value", e.target.value, "aboutPromiseStats")} />
                  <button type="button" onClick={() => removeStat(index, "aboutPromiseStats")} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStat("aboutPromiseStats")} className="btn-outline">إضافة رقم</button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">عنوان الرسالة</label>
              <input className="input mt-2" value={settings.aboutMissionTitle} onChange={(e) => updateField("aboutMissionTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">نص الرسالة</label>
              <textarea className="input mt-2" rows="2" value={settings.aboutMissionBody} onChange={(e) => updateField("aboutMissionBody", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان الرؤية</label>
              <input className="input mt-2" value={settings.aboutVisionTitle} onChange={(e) => updateField("aboutVisionTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">نص الرؤية</label>
              <textarea className="input mt-2" rows="2" value={settings.aboutVisionBody} onChange={(e) => updateField("aboutVisionBody", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">كلمة القيم</label>
              <input className="input mt-2" value={settings.aboutValuesKicker} onChange={(e) => updateField("aboutValuesKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان القيم</label>
              <input className="input mt-2" value={settings.aboutValuesTitle} onChange={(e) => updateField("aboutValuesTitle", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">قيم المنصة</label>
            <div className="mt-2 space-y-3">
              {(settings.aboutValues || []).map((value, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={value} onChange={(e) => updateStringItem("aboutValues", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("aboutValues", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("aboutValues")} className="btn-outline">إضافة قيمة</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">صفحة الخدمات</h2>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">كلمة الصفحة</label>
              <input className="input mt-2" value={settings.servicesPageKicker} onChange={(e) => updateField("servicesPageKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان الصفحة</label>
              <input className="input mt-2" value={settings.servicesPageTitle} onChange={(e) => updateField("servicesPageTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">وصف الصفحة</label>
              <input className="input mt-2" value={settings.servicesPageSubtitle} onChange={(e) => updateField("servicesPageSubtitle", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">كلمة خطوات الخدمة</label>
              <input className="input mt-2" value={settings.servicesStepsKicker} onChange={(e) => updateField("servicesStepsKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان خطوات الخدمة</label>
              <input className="input mt-2" value={settings.servicesStepsTitle} onChange={(e) => updateField("servicesStepsTitle", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">خطوات الخدمات</label>
            <div className="mt-2 space-y-3">
              {(settings.servicesSteps || []).map((item, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[2fr_3fr_1fr_auto]">
                  <input className="input" placeholder="العنوان" value={item.title} onChange={(e) => updateArrayItem("servicesSteps", index, "title", e.target.value)} />
                  <input className="input" placeholder="الوصف" value={item.description} onChange={(e) => updateArrayItem("servicesSteps", index, "description", e.target.value)} />
                  <input className="input" placeholder="الأيقونة" value={item.icon || ""} onChange={(e) => updateArrayItem("servicesSteps", index, "icon", e.target.value)} />
                  <button type="button" onClick={() => removeArrayItem("servicesSteps", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("servicesSteps", { title: "", description: "", icon: "" })} className="btn-outline">إضافة خطوة</button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">كلمة الأقسام</label>
              <input className="input mt-2" value={settings.servicesCategoriesKicker} onChange={(e) => updateField("servicesCategoriesKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان الأقسام</label>
              <input className="input mt-2" value={settings.servicesCategoriesTitle} onChange={(e) => updateField("servicesCategoriesTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">شارة الأقسام</label>
              <input className="input mt-2" value={settings.servicesChipText} onChange={(e) => updateField("servicesChipText", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold">تفاصيل الخدمة</h2>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">كلمة التفاصيل</label>
              <input className="input mt-2" value={settings.serviceDetailKicker} onChange={(e) => updateField("serviceDetailKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">كلمة خطوات التنفيذ</label>
              <input className="input mt-2" value={settings.serviceDetailStepsKicker} onChange={(e) => updateField("serviceDetailStepsKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">عنوان خطوات التنفيذ</label>
              <input className="input mt-2" value={settings.serviceDetailStepsTitle} onChange={(e) => updateField("serviceDetailStepsTitle", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">خطوات التنفيذ</label>
            <div className="mt-2 space-y-3">
              {(settings.serviceDetailSteps || []).map((step, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={step} onChange={(e) => updateStringItem("serviceDetailSteps", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("serviceDetailSteps", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("serviceDetailSteps")} className="btn-outline">إضافة خطوة</button>
            </div>
          </div>
          <div>
            <label className="label">عنوان الضمانات</label>
            <input className="input mt-2" value={settings.serviceDetailGuaranteesTitle} onChange={(e) => updateField("serviceDetailGuaranteesTitle", e.target.value)} />
          </div>
          <div>
            <label className="label">ضمانات الخدمة</label>
            <div className="mt-2 space-y-3">
              {(settings.serviceDetailGuarantees || []).map((item, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={item} onChange={(e) => updateStringItem("serviceDetailGuarantees", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("serviceDetailGuarantees", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("serviceDetailGuarantees")} className="btn-outline">إضافة ضمان</button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">عنوان CTA</label>
              <input className="input mt-2" value={settings.serviceDetailCtaTitle} onChange={(e) => updateField("serviceDetailCtaTitle", e.target.value)} />
            </div>
            <div>
              <label className="label">وصف CTA</label>
              <input className="input mt-2" value={settings.serviceDetailCtaSubtitle} onChange={(e) => updateField("serviceDetailCtaSubtitle", e.target.value)} />
            </div>
            <div>
              <label className="label">نص زر CTA</label>
              <input className="input mt-2" value={settings.serviceDetailCtaButton} onChange={(e) => updateField("serviceDetailCtaButton", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">صفحة التواصل</h2>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">الكلمة التعريفية</label>
              <input className="input mt-2" value={settings.contactKicker} onChange={(e) => updateField("contactKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">العنوان</label>
              <input className="input mt-2" value={settings.contactTitle} onChange={(e) => updateField("contactTitle", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">الوصف</label>
            <textarea className="input mt-2" rows="2" value={settings.contactSubtitle} onChange={(e) => updateField("contactSubtitle", e.target.value)} />
          </div>
          <div>
            <label className="label">البريد الإلكتروني</label>
            <input className="input mt-2" value={settings.contactEmail} onChange={(e) => updateField("contactEmail", e.target.value)} />
          </div>
          <div>
            <label className="label">ملاحظة التواصل</label>
            <input className="input mt-2" value={settings.contactNote} onChange={(e) => updateField("contactNote", e.target.value)} />
          </div>
          <div>
            <label className="label">بطاقات التواصل</label>
            <div className="mt-2 space-y-3">
              {(settings.contactCards || []).map((card, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1.2fr_2fr_1fr_auto]">
                  <input className="input" placeholder="العنوان" value={card.title} onChange={(e) => updateArrayItem("contactCards", index, "title", e.target.value)} />
                  <input className="input" placeholder="الوصف" value={card.description} onChange={(e) => updateArrayItem("contactCards", index, "description", e.target.value)} />
                  <input className="input" placeholder="الميتا" value={card.meta || ""} onChange={(e) => updateArrayItem("contactCards", index, "meta", e.target.value)} />
                  <button type="button" onClick={() => removeArrayItem("contactCards", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("contactCards", { title: "", description: "", meta: "" })} className="btn-outline">إضافة بطاقة</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">صفحة التحميل</h2>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">الكلمة التعريفية</label>
              <input className="input mt-2" value={settings.downloadKicker} onChange={(e) => updateField("downloadKicker", e.target.value)} />
            </div>
            <div>
              <label className="label">العنوان</label>
              <input className="input mt-2" value={settings.downloadTitle} onChange={(e) => updateField("downloadTitle", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">الوصف</label>
            <textarea className="input mt-2" rows="2" value={settings.downloadSubtitle} onChange={(e) => updateField("downloadSubtitle", e.target.value)} />
          </div>
          <div>
            <label className="label">مزايا التحميل</label>
            <div className="mt-2 space-y-3">
              {(settings.downloadPerks || []).map((perk, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={perk} onChange={(e) => updateStringItem("downloadPerks", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("downloadPerks", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("downloadPerks")} className="btn-outline">إضافة ميزة</button>
            </div>
          </div>
          <div>
            <label className="label">عنوان بطاقة التحميل</label>
            <input className="input mt-2" value={settings.downloadCardTitle} onChange={(e) => updateField("downloadCardTitle", e.target.value)} />
          </div>
          <div>
            <label className="label">نص بطاقة التحميل</label>
            <textarea className="input mt-2" rows="2" value={settings.downloadCardBody} onChange={(e) => updateField("downloadCardBody", e.target.value)} />
          </div>
          <div>
            <label className="label">نقاط بطاقة التحميل</label>
            <div className="mt-2 space-y-3">
              {(settings.downloadBullets || []).map((bullet, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input className="input" value={bullet} onChange={(e) => updateStringItem("downloadBullets", index, e.target.value)} />
                  <button type="button" onClick={() => removeStringItem("downloadBullets", index)} className="btn-outline">حذف</button>
                </div>
              ))}
              <button type="button" onClick={() => addStringItem("downloadBullets")} className="btn-outline">إضافة نقطة</button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">نص زر Android</label>
              <input className="input mt-2" value={settings.downloadAndroidLabel} onChange={(e) => updateField("downloadAndroidLabel", e.target.value)} />
            </div>
            <div>
              <label className="label">نص زر iOS</label>
              <input className="input mt-2" value={settings.downloadIosLabel} onChange={(e) => updateField("downloadIosLabel", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold">المدونة والفوتر</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">كلمة المدونة</label>
            <input className="input mt-2" value={settings.blogKicker} onChange={(e) => updateField("blogKicker", e.target.value)} />
          </div>
          <div>
            <label className="label">عنوان المدونة</label>
            <input className="input mt-2" value={settings.blogTitle} onChange={(e) => updateField("blogTitle", e.target.value)} />
          </div>
          <div>
            <label className="label">وصف المدونة</label>
            <input className="input mt-2" value={settings.blogSubtitle} onChange={(e) => updateField("blogSubtitle", e.target.value)} />
          </div>
          <div>
            <label className="label">وصف الفوتر</label>
            <input className="input mt-2" value={settings.footerDescription} onChange={(e) => updateField("footerDescription", e.target.value)} />
          </div>
        </div>
      </div>

      {status && <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
    </form>
  );
}
