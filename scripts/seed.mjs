import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import AdminUser from "../src/models/AdminUser.js";
import SiteSettings from "../src/models/SiteSettings.js";
import Category from "../src/models/Category.js";
import BlogPost from "../src/models/BlogPost.js";
import StaticPage from "../src/models/StaticPage.js";
import Theme from "../src/models/Theme.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

const defaultStats = [
  { label: "حرفي معتمد", value: "+1200" },
  { label: "طلبات مكتملة", value: "+48K" },
  { label: "مدينة نخدمها", value: "16" }
];

const defaultSiteSettings = {
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
    { name: "هالة محمود", role: "عميلة", quote: "التجربة كانت احترافية جدًا، كل شيء واضح من البداية حتى التسليم." },
    { name: "يوسف علي", role: "صاحب مشروع", quote: "وفرت وقت كبير على فريق الصيانة، والمتابعة ممتازة خطوة بخطوة." },
    { name: "سارة أحمد", role: "ربة منزل", quote: "خدمة سريعة ودعم متجاوب، أنصح بها لأي حد يحتاج حل موثوق." }
  ],
  homeFaqs: [
    { question: "كيف يتم اعتماد الحرفيين؟", answer: "نراجع الهوية والخبرة والتقييمات بشكل مستمر لضمان جودة الخدمة." },
    { question: "هل يمكنني اختيار الموعد المناسب؟", answer: "نعم، يمكنك تحديد الوقت المناسب ومتابعة التنفيذ عبر التطبيق." },
    { question: "هل توجد ضمانات بعد التنفيذ؟", answer: "نعم، نغطي الخدمة بضمان جودة ودعم لحل أي ملاحظات بسرعة." }
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
    { title: "الدعم الفني", description: "نساعدك في متابعة الطلبات وحل أي مشكلة بسرعة.", meta: "متاح 24/7" },
    { title: "الشراكات", description: "انضم لشبكة الحرفيين أو تعاون كشركة.", meta: "قنوات خاصة للأعمال" },
    { title: "الإعلام", description: "للاستفسارات الإعلامية أو المواد التعريفية.", meta: "فريق العلاقات العامة" }
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
  footerDescription: "منصة مصرية تربط العملاء بأفضل الحرفيين، مع تجربة طلب ذكية وآمنة وخدمة متابعة لحظية.",
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    whatsapp: ""
  },
  activeTheme: "default"
};

const cloneValue = (value) => JSON.parse(JSON.stringify(value));

const fillDefaults = (doc, defaults) => {
  let changed = false;
  Object.entries(defaults).forEach(([key, value]) => {
    const current = doc[key];
    const isEmptyString = typeof current === "string" && current.trim() === "";
    const isEmptyArray = Array.isArray(current) && current.length === 0;
    if (typeof current === "undefined" || isEmptyString || isEmptyArray) {
      doc[key] = cloneValue(value);
      changed = true;
    }
  });
  if (!doc.defaultsSeeded) {
    doc.defaultsSeeded = true;
    changed = true;
  }
  return changed;
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  try {
    const adminEmail = "admin@usta.com";
    const existingAdmin = await AdminUser.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash("Admin@12345", 10);
      await AdminUser.create({
        name: "Admin",
        email: adminEmail,
        passwordHash,
        role: "admin",
        disabled: false
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    let settings = await SiteSettings.findOne({ key: "default" });
    if (!settings) {
      settings = new SiteSettings({ key: "default" });
    }
    const settingsChanged = fillDefaults(settings, defaultSiteSettings);
    if (settingsChanged) {
      await settings.save();
      console.log("SiteSettings updated with default content");
    } else {
      console.log("SiteSettings already has data");
    }

    const categories = [
      {
        name: "كهرباء",
        slug: "electric",
        description: "حلول كهربائية آمنة",
        icon: "⚡",
        isActive: true
      },
      {
        name: "سباكة",
        slug: "plumbing",
        description: "خدمات سباكة سريعة",
        icon: "🚿",
        isActive: true
      },
      {
        name: "نجارة",
        slug: "carpentry",
        description: "تفصيل وتركيب احترافي",
        icon: "🪵",
        isActive: true
      }
    ];

    for (const c of categories) {
      await Category.updateOne(
        { slug: c.slug },
        { $setOnInsert: c },
        { upsert: true }
      );
    }
    console.log("Categories ensured");

    await BlogPost.updateOne(
      { slug: "choose-right-artisan" },
      {
        $setOnInsert: {
          title: "كيف تختار الحرفي المناسب؟",
          slug: "choose-right-artisan",
          excerpt: "نصائح عملية لاختيار الحرفي المناسب لخدمتك.",
          content:
            "# كيف تختار الحرفي المناسب؟\n\nاختر الحرفي بناءً على التقييمات، الخبرة، والالتزام بالمواعيد.\n\n## نصائح مهمة\n- راجع التقييمات السابقة\n- اطلب عرض سعر واضح\n- تواصل بوضوح قبل بدء العمل",
          contentType: "markdown",
          author: "فريق Usta",
          published: true,
          publishedAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log("Blog post ensured");

    const themeCount = await Theme.countDocuments();
    if (!themeCount) {
      await Theme.insertMany([
        {
          name: "الثيم الافتراضي",
          slug: "default",
          isActive: true,
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
          name: "ثيم رملي",
          slug: "sand",
          isActive: false,
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
          name: "بنفسجي ملكي",
          slug: "royal-purple",
          isActive: false,
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
          isActive: false,
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
          isActive: false,
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
      ]);
      console.log("Themes created");
    } else {
      console.log("Themes already exist");
    }

    await Theme.updateMany(
      { slug: { $ne: "default" } },
      { $set: { isActive: false } }
    );
    await Theme.updateOne({ slug: "default" }, { $set: { isActive: true } });
    console.log("Active theme enforced: default");

    await StaticPage.updateOne(
      { key: "privacy" },
      {
        $setOnInsert: {
          key: "privacy",
          title: "سياسة الخصوصية",
          content: "نحن نحترم خصوصيتك ونلتزم بحماية بياناتك.",
          contentType: "markdown"
        }
      },
      { upsert: true }
    );

    await StaticPage.updateOne(
      { key: "terms" },
      {
        $setOnInsert: {
          key: "terms",
          title: "الشروط والأحكام",
          content: "استخدامك لمنصة Usta يعني موافقتك على هذه الشروط.",
          contentType: "markdown"
        }
      },
      { upsert: true }
    );

    console.log("Static pages ensured");
    console.log("Seeding completed successfully");
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

run().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
