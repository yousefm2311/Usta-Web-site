import { dbConnect } from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { getDbStatCounts, STAT_KEYS } from "@/services/statsService";

const SETTINGS_KEY = "default";

const defaultStats = [
  { label: "حرفي معتمد", value: "+1200" },
  { label: "طلبات مكتملة", value: "+48K" },
  { label: "مدينة نخدمها", value: "16" }
];

const defaultContent = {
  heroTitle: "اطلب أفضل الحرفيين في دقائق",
  heroSubtitle: "Usta منصة تربطك بحرفيين موثوقين لإنجاز أي مهمة بسرعة.",
  heroKicker: "منصة الحرفيين للأعمال الكبيرة",
  heroChips: ["دعم 24/7", "مدفوعات آمنة", "تتبع مباشر"],
  heroCardBadge: "لوحة متابعة",
  heroCardStatus: "مباشر",
  heroCardTitle: "طلب جديد",
  heroCardDescription: "متابعة فورية لحالة الطلب، الحرفي، ووقت الوصول المتوقع.",
  heroCardTrend: "نمو مستمر هذا الشهر",
  heroCardArrivalLabel: "وقت الوصول",
  heroCardArrivalValue: "20 دقيقة",
  trustText: "موثوق من فرق الصيانة والشركات في مختلف القطاعات داخل المنطقة.",
  trustBadges: ["شركات", "المنازل", "العيادات", "المكاتب", "المطاعم", "المجمعات السكنية"],
  ctaPrimaryText: "حمّل التطبيق",
  ctaPrimaryUrl: "/download",
  ctaSecondaryText: "انضم كحرفي",
  ctaSecondaryUrl: "/contact",
  androidUrl: "https://play.google.com",
  iosUrl: "https://apple.com",
  stats: defaultStats,
  homeServicesKicker: "الخدمات",
  homeServicesTitle: "اختر القسم المناسب في ثوانٍ",
  homeServicesSubtitle: "خدمات مصنفة بعناية لتجد ما تحتاجه بسرعة مع وصف واضح لكل قسم.",
  homeServicesButtonText: "تصفح كل الخدمات",
  homeWhyKicker: "لماذا Usta؟",
  homeWhyTitle: "منصة مبنية للثقة والكفاءة",
  homeHowKicker: "كيف تعمل المنصة؟",
  homeHowTitle: "رحلة بسيطة بثلاث خطوات",
  homeTestimonialsKicker: "آراء العملاء",
  homeTestimonialsTitle: "ثقة المستخدمين في Usta",
  homeFaqKicker: "الأسئلة الشائعة",
  homeFaqTitle: "كل ما تحتاج معرفته قبل البدء",
  homeFaqSubtitle: "إذا كان لديك سؤال إضافي، فريقنا جاهز للمساعدة عبر القنوات الرسمية.",
  homeBlogKicker: "المدونة",
  homeBlogTitle: "نصائح ومقالات مفيدة",
  homeBlogButtonText: "عرض الكل",
  homeCtaTitle: "جاهز تبدأ تجربتك؟",
  homeCtaSubtitle: "حمّل التطبيق أو انضم للحرفيين وابدأ بتنمية عملك عبر منصة احترافية.",
  homeHighlights: [
    {
      title: "شبكة حرفيين معتمدة",
      description: "تحقق من الهوية والخبرة وتقييمات حقيقية قبل قبول أي حرفي.",
      icon: "🛡️"
    },
    {
      title: "تسعير واضح ومقارنات",
      description: "تعرف على نطاق السعر، اختر الأفضل، ولا مفاجآت بعد التنفيذ.",
      icon: "📊"
    },
    {
      title: "متابعة وضمان الخدمة",
      description: "مراقبة لحظية، دعم مباشر، وضمان جودة يحميك بعد التسليم.",
      icon: "⚡"
    }
  ],
  homeSteps: [
    {
      title: "اختر الخدمة",
      description: "تصفح الأقسام وحدد الخدمة المناسبة مع تفاصيل واضحة.",
      icon: "🧰"
    },
    {
      title: "حدد التفاصيل",
      description: "اضف الوقت والموقع ورفع الصور لتسعير أدق.",
      icon: "🧭"
    },
    {
      title: "تابع التنفيذ",
      description: "حرفي معتمد يصل إليك، وتتابع كل خطوة حتى الإنهاء.",
      icon: "✅"
    }
  ],
  homeTestimonials: [
    {
      name: "هالة محمود",
      role: "عميلة",
      quote: "التجربة كانت احترافية جدًا، كل شيء واضح من البداية حتى التسليم."
    },
    {
      name: "يوسف علي",
      role: "صاحب مشروع",
      quote: "وفرت وقت كبير على فريق الصيانة، والمتابعة ممتازة خطوة بخطوة."
    },
    {
      name: "سارة أحمد",
      role: "ربة منزل",
      quote: "خدمة سريعة ودعم متجاوب، أنصح بها لأي حد يحتاج حل موثوق."
    }
  ],
  homeFaqs: [
    {
      question: "كيف يتم اعتماد الحرفيين؟",
      answer: "نراجع الهوية والخبرة والتقييمات بشكل مستمر لضمان جودة الخدمة."
    },
    {
      question: "هل يمكنني اختيار الموعد المناسب؟",
      answer: "نعم، يمكنك تحديد الوقت المناسب ومتابعة التنفيذ عبر التطبيق."
    },
    {
      question: "هل توجد ضمانات بعد التنفيذ؟",
      answer: "نعم، نغطي الخدمة بضمان جودة ودعم لحل أي ملاحظات بسرعة."
    }
  ],
  aboutKicker: "من نحن",
  aboutTitle: "قصة Usta باختصار",
  aboutSubtitle: "تأسست Usta لتكون الجسر الرقمي بين العملاء والحرفيين المحترفين. هدفنا تقديم تجربة طلب خدمات موثوقة، واضحة، وسريعة بمستوى ينافس أكبر المنصات.",
  aboutChips: ["شبكة حرفيين معتمدة", "دعم مستمر", "تتبع مباشر"],
  aboutPromiseTitle: "ماذا نعدك؟",
  aboutPromiseBody: "تجربة خالية من المفاجآت، تسعير واضح، وتنفيذ بمعايير جودة ثابتة حتى بعد انتهاء الخدمة.",
  aboutPromiseStats: [
    { label: "نسبة الالتزام", value: "98%" },
    { label: "متوسط التقييم", value: "4.9 / 5" }
  ],
  aboutMissionTitle: "رسالتنا",
  aboutMissionBody: "تمكين الحرفيين من الوصول لعملاء أكثر، وتسهيل الحصول على الخدمات بأعلى مستوى من الجودة والشفافية.",
  aboutVisionTitle: "رؤيتنا",
  aboutVisionBody: "أن نصبح المنصة الأولى لخدمات الحرفيين في المنطقة، بالاعتماد على البيانات والتقنية لرفع جودة كل تجربة.",
  aboutValuesKicker: "قيمنا",
  aboutValuesTitle: "ما نلتزم به كل يوم",
  aboutValues: ["الثقة والشفافية", "تجربة عميل استثنائية", "ابتكار مستمر", "تمكين الحرفيين", "جودة الخدمة"],
  servicesPageKicker: "الخدمات",
  servicesPageTitle: "كل ما تحتاجه في مكان واحد",
  servicesPageSubtitle: "اختر القسم المناسب لطلب خدمتك بسهولة، مع تفاصيل واضحة وأسعار شفافة.",
  servicesStepsKicker: "كيف تعمل المنصة؟",
  servicesStepsTitle: "3 خطوات بسيطة لطلب الخدمة",
  servicesSteps: [
    { title: "حدد احتياجك", description: "اختر الخدمة وحدد التفاصيل بدقة.", icon: "🧭" },
    { title: "استلم عروض الأسعار", description: "قارن العروض واختر الأفضل لك.", icon: "📊" },
    { title: "تابع التنفيذ", description: "تحديثات مباشرة حتى اكتمال الطلب.", icon: "✅" }
  ],
  servicesCategoriesKicker: "الأقسام",
  servicesCategoriesTitle: "اختر القسم المناسب",
  servicesChipText: "محدث يوميًا",
  serviceDetailKicker: "تفاصيل الخدمة",
  serviceDetailStepsKicker: "كيف تعمل هذه الخدمة؟",
  serviceDetailStepsTitle: "خطوات التنفيذ",
  serviceDetailSteps: [
    "حدد تفاصيل الخدمة والموقع والوقت المناسب.",
    "يصلك حرفي معتمد للمعاينة والتنفيذ.",
    "تابع التنفيذ وقيّم الخدمة بعد الانتهاء."
  ],
  serviceDetailGuaranteesTitle: "ماذا تحصل عليه؟",
  serviceDetailGuarantees: [
    "تسعير واضح قبل بدء التنفيذ",
    "حرفيون معتمدون وتقييمات موثوقة",
    "دعم مباشر حتى اكتمال الطلب"
  ],
  serviceDetailCtaTitle: "جاهز لطلب الخدمة؟",
  serviceDetailCtaSubtitle: "تواصل معنا لتحديد تفاصيل الطلب والحصول على أفضل عرض.",
  serviceDetailCtaButton: "ابدأ الآن",
  contactKicker: "تواصل معنا",
  contactTitle: "نحن هنا لمساعدتك",
  contactSubtitle: "يسعدنا الرد على استفساراتك. اترك رسالتك وسنعود إليك في أسرع وقت.",
  contactEmail: "usta.contact.site@gmail.com",
  contactNote: "تابعنا عبر شبكات التواصل الاجتماعي من أسفل الصفحة.",
  contactCards: [
    {
      title: "الدعم الفني",
      description: "نساعدك في متابعة الطلبات وحل أي مشكلة بسرعة.",
      meta: "متاح 24/7"
    },
    {
      title: "الشراكات",
      description: "انضم لشبكة الحرفيين أو تعاون كشركة.",
      meta: "قنوات خاصة للأعمال"
    },
    {
      title: "الإعلام",
      description: "للاستفسارات الإعلامية أو المواد التعريفية.",
      meta: "فريق العلاقات العامة"
    }
  ],
  downloadKicker: "تحميل التطبيق",
  downloadTitle: "ابدأ تجربتك الاحترافية الآن",
  downloadSubtitle: "حمّل تطبيق Usta على هاتفك الذكي واطلب الخدمة التي تحتاجها خلال دقائق.",
  downloadPerks: ["تتبع مباشر", "عروض أسعار واضحة", "دعم فوري"],
  downloadCardTitle: "كل شيء في تطبيق واحد",
  downloadCardBody: "إدارة الطلبات، متابعة التنفيذ، والدفع الآمن من أي مكان.",
  downloadBullets: ["إشعارات لحظية عند تحديث الحالة", "تقييمات واقعية للحرفيين", "دعم مباشر داخل التطبيق"],
  downloadAndroidLabel: "تحميل Android",
  downloadIosLabel: "تحميل iOS",
  blogKicker: "المدونة",
  blogTitle: "محتوى عملي يساعدك",
  blogSubtitle: "تابع أحدث النصائح والمقالات لتحسين تجربة الصيانة وإدارة الطلبات.",
  footerDescription: "منصة مصرية تربط العملاء بأفضل الحرفيين، مع تجربة طلب ذكية وآمنة وخدمة متابعة لحظية."
};

const cloneValue = (value) => JSON.parse(JSON.stringify(value));

const ensureDefaults = async (settings) => {
  let changed = false;
  const seedEmpty = !settings.defaultsSeeded;

  Object.entries(defaultContent).forEach(([key, value]) => {
    const current = settings[key];
    const isEmptyString = typeof current === "string" && current.trim() === "";
    const isEmptyArray = Array.isArray(current) && current.length === 0;

    if (typeof current === "undefined" || (seedEmpty && (isEmptyString || isEmptyArray))) {
      settings[key] = cloneValue(value);
      changed = true;
    }
  });

  if (seedEmpty) {
    settings.defaultsSeeded = true;
    changed = true;
  }

  if (changed) {
    await settings.save();
  }
};

const formatCount = (value) => {
  if (typeof value !== "number") return null;
  return new Intl.NumberFormat("en-US").format(value);
};

const STAT_LABEL_ALIASES = {
  customers: ["عميل", "عملاء", "العملاء", "customer", "customers", "client", "clients"],
  artisans: ["حرفي", "حرفيين", "فني", "فنيين", "artisan", "artisans", "craftsman", "craftsmen", "technician", "technicians"],
  orders: ["طلب", "طلبات", "order", "orders", "booking", "bookings", "request", "requests"],
  services: ["خدمة", "خدمات", "تصنيف", "تصنيفات", "فئة", "فئات", "service", "services", "category", "categories"]
};

const resolveStatKey = (stat, index) => {
  const label = `${stat?.label || ""}`.toLowerCase();
  for (const [key, aliases] of Object.entries(STAT_LABEL_ALIASES)) {
    if (aliases.some((alias) => label.includes(alias))) {
      return key;
    }
  }
  return STAT_KEYS[index];
};

const mergeStatsWithCounts = (stats, counts) => {
  return stats.map((stat, index) => {
    const key = resolveStatKey(stat, index);
    if (!key) return stat;
    const formatted = formatCount(counts?.[key]);
    if (!formatted) return stat;
    return { ...stat, value: formatted };
  });
};

export async function getSiteSettings() {
  await dbConnect();
  let settings = await SiteSettings.findOne({ key: SETTINGS_KEY }).sort({ createdAt: -1 });
  if (!settings) {
    const latest = await SiteSettings.findOne().sort({ createdAt: -1 });
    if (latest) {
      latest.key = SETTINGS_KEY;
      if (!latest.stats?.length) {
        latest.stats = defaultStats;
      }
      settings = await latest.save();
    } else {
      settings = await SiteSettings.create({ key: SETTINGS_KEY, stats: defaultStats });
    }
  }
  if (!settings.activeTheme) {
    settings.activeTheme = "default";
    await settings.save();
  }
  await ensureDefaults(settings);
  const settingsData = settings.toObject();
  const statsSource = Array.isArray(settingsData.stats) && settingsData.stats.length ? settingsData.stats : defaultStats;
  const counts = await getDbStatCounts();
  settingsData.stats = mergeStatsWithCounts(statsSource, counts);
  return settingsData;
}

export async function updateSiteSettings(payload) {
  await dbConnect();
  const { key: _key, ...payloadData } = payload || {};
  const settings = await SiteSettings.findOneAndUpdate(
    { key: SETTINGS_KEY },
    { $set: payloadData },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return settings?.toObject();
}
