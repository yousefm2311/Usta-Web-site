import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

const SiteSettingsSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: "اطلب أفضل الحرفيين في دقائق" },
    heroSubtitle: { type: String, default: "Usta منصة تربطك بحرفيين موثوقين لإنجاز أي مهمة بسرعة." },
    ctaPrimaryText: { type: String, default: "حمّل التطبيق" },
    ctaPrimaryUrl: { type: String, default: "/download" },
    ctaSecondaryText: { type: String, default: "انضم كحرفي" },
    ctaSecondaryUrl: { type: String, default: "/contact" },
    androidUrl: { type: String, default: "https://play.google.com" },
    iosUrl: { type: String, default: "https://apple.com" },
    socials: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      youtube: { type: String, default: "" },
      whatsapp: { type: String, default: "" }
    },
    stats: { type: [StatsSchema], default: [] },
    activeTheme: { type: String, default: "default" }
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
