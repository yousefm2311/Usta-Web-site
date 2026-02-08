import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

const FeatureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "" }
  },
  { _id: false }
);

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true }
  },
  { _id: false }
);

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
);

const ContactCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    meta: { type: String, default: "" }
  },
  { _id: false }
);

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", index: true },
    heroTitle: { type: String, default: "اطلب أفضل الحرفيين في دقائق" },
    heroSubtitle: { type: String, default: "Usta منصة تربطك بحرفيين موثوقين لإنجاز أي مهمة بسرعة." },
    heroKicker: { type: String, default: "" },
    heroChips: { type: [String], default: [] },
    heroCardBadge: { type: String, default: "" },
    heroCardStatus: { type: String, default: "" },
    heroCardTitle: { type: String, default: "" },
    heroCardDescription: { type: String, default: "" },
    heroCardTrend: { type: String, default: "" },
    heroCardArrivalLabel: { type: String, default: "" },
    heroCardArrivalValue: { type: String, default: "" },
    trustText: { type: String, default: "" },
    trustBadges: { type: [String], default: [] },
    ctaPrimaryText: { type: String, default: "حمّل التطبيق" },
    ctaPrimaryUrl: { type: String, default: "/download" },
    ctaSecondaryText: { type: String, default: "انضم كحرفي" },
    ctaSecondaryUrl: { type: String, default: "/contact" },
    androidUrl: { type: String, default: "https://play.google.com" },
    iosUrl: { type: String, default: "https://apple.com" },
    homeServicesKicker: { type: String, default: "" },
    homeServicesTitle: { type: String, default: "" },
    homeServicesSubtitle: { type: String, default: "" },
    homeServicesButtonText: { type: String, default: "" },
    homeWhyKicker: { type: String, default: "" },
    homeWhyTitle: { type: String, default: "" },
    homeHowKicker: { type: String, default: "" },
    homeHowTitle: { type: String, default: "" },
    homeTestimonialsKicker: { type: String, default: "" },
    homeTestimonialsTitle: { type: String, default: "" },
    homeFaqKicker: { type: String, default: "" },
    homeFaqTitle: { type: String, default: "" },
    homeFaqSubtitle: { type: String, default: "" },
    homeBlogKicker: { type: String, default: "" },
    homeBlogTitle: { type: String, default: "" },
    homeBlogButtonText: { type: String, default: "" },
    homeCtaTitle: { type: String, default: "" },
    homeCtaSubtitle: { type: String, default: "" },
    homeHighlights: { type: [FeatureSchema], default: [] },
    homeSteps: { type: [FeatureSchema], default: [] },
    homeTestimonials: { type: [TestimonialSchema], default: [] },
    homeFaqs: { type: [FAQSchema], default: [] },
    aboutKicker: { type: String, default: "" },
    aboutTitle: { type: String, default: "" },
    aboutSubtitle: { type: String, default: "" },
    aboutChips: { type: [String], default: [] },
    aboutPromiseTitle: { type: String, default: "" },
    aboutPromiseBody: { type: String, default: "" },
    aboutPromiseStats: { type: [StatsSchema], default: [] },
    aboutMissionTitle: { type: String, default: "" },
    aboutMissionBody: { type: String, default: "" },
    aboutVisionTitle: { type: String, default: "" },
    aboutVisionBody: { type: String, default: "" },
    aboutValuesKicker: { type: String, default: "" },
    aboutValuesTitle: { type: String, default: "" },
    aboutValues: { type: [String], default: [] },
    servicesPageKicker: { type: String, default: "" },
    servicesPageTitle: { type: String, default: "" },
    servicesPageSubtitle: { type: String, default: "" },
    servicesStepsKicker: { type: String, default: "" },
    servicesStepsTitle: { type: String, default: "" },
    servicesSteps: { type: [FeatureSchema], default: [] },
    servicesCategoriesKicker: { type: String, default: "" },
    servicesCategoriesTitle: { type: String, default: "" },
    servicesChipText: { type: String, default: "" },
    serviceDetailKicker: { type: String, default: "" },
    serviceDetailStepsKicker: { type: String, default: "" },
    serviceDetailStepsTitle: { type: String, default: "" },
    serviceDetailSteps: { type: [String], default: [] },
    serviceDetailGuaranteesTitle: { type: String, default: "" },
    serviceDetailGuarantees: { type: [String], default: [] },
    serviceDetailCtaTitle: { type: String, default: "" },
    serviceDetailCtaSubtitle: { type: String, default: "" },
    serviceDetailCtaButton: { type: String, default: "" },
    contactKicker: { type: String, default: "" },
    contactTitle: { type: String, default: "" },
    contactSubtitle: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    contactNote: { type: String, default: "" },
    contactCards: { type: [ContactCardSchema], default: [] },
    downloadKicker: { type: String, default: "" },
    downloadTitle: { type: String, default: "" },
    downloadSubtitle: { type: String, default: "" },
    downloadPerks: { type: [String], default: [] },
    downloadCardTitle: { type: String, default: "" },
    downloadCardBody: { type: String, default: "" },
    downloadBullets: { type: [String], default: [] },
    downloadAndroidLabel: { type: String, default: "" },
    downloadIosLabel: { type: String, default: "" },
    blogKicker: { type: String, default: "" },
    blogTitle: { type: String, default: "" },
    blogSubtitle: { type: String, default: "" },
    footerDescription: { type: String, default: "" },
    socials: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      youtube: { type: String, default: "" },
      whatsapp: { type: String, default: "" }
    },
    stats: { type: [StatsSchema], default: [] },
    defaultsSeeded: { type: Boolean, default: false },
    activeTheme: { type: String, default: "default" }
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
