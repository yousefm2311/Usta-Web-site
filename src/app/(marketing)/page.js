import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import BlogCard from "@/components/BlogCard";
import StatCard from "@/components/StatCard";
import { getSiteSettings } from "@/services/siteSettingsService";
import { getActiveCategories } from "@/services/categoryService";
import { getPublishedPosts } from "@/services/blogService";

export const metadata = {
  title: "الرئيسية",
  description: "Usta منصة تربط العملاء بأفضل الحرفيين بسرعة وموثوقية."
};

const howItWorks = [
  { title: "اختر الخدمة", description: "تصفح الأقسام واختر الخدمة المناسبة.", icon: "🛠️" },
  { title: "حدد الموعد", description: "اختر الوقت المناسب وحدد تفاصيل الطلب.", icon: "📅" },
  { title: "استلم الخدمة", description: "حرفي معتمد يصل إليك بسرعة وجودة.", icon: "✅" }
];

const testimonials = [
  { name: "هالة محمود", role: "عميلة", quote: "التجربة كانت سهلة وسريعة، والحرفي كان محترف جداً." },
  { name: "يوسف علي", role: "صاحب مشروع", quote: "وفرت علي وقت كبير، أنصح بها لأي شخص يحتاج خدمات موثوقة." },
  { name: "سارة أحمد", role: "ربة منزل", quote: "الدعم رائع والتطبيق واضح ومفيد." }
];

const faqs = [
  { question: "كيف أتأكد من جودة الحرفي؟", answer: "نقوم بمراجعة الحرفيين والتحقق من تقييماتهم بشكل مستمر." },
  { question: "هل يمكنني تحديد موعد معين؟", answer: "نعم، يمكنك اختيار الوقت المناسب لك مباشرة من التطبيق." },
  { question: "هل الأسعار ثابتة؟", answer: "الأسعار تعتمد على نوع الخدمة ونطاق العمل، ويتم توضيحها قبل قبول الطلب." }
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const categories = await getActiveCategories();
  const blogData = await getPublishedPosts({ page: 1, pageSize: 3 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Usta",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/favicon.ico`
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--theme-gradient-from)] via-[color:var(--theme-surface)] to-[color:var(--theme-gradient-to)]">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <span className="badge">منصة الحرفيين الأولى</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{settings.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={settings.ctaPrimaryUrl} className="btn-primary">
                {settings.ctaPrimaryText}
              </Link>
              <Link href={settings.ctaSecondaryUrl} className="btn-outline">
                {settings.ctaSecondaryText}
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="animate-floaty rounded-3xl border border-blue-100 bg-[color:var(--theme-surface)] p-8 shadow-xl">
              <p className="text-sm text-blue-700">طلبات اليوم</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{settings.stats?.[1]?.value || "+48K"}</p>
              <p className="mt-6 text-sm text-slate-600">متوسط وقت الوصول</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">20 دقيقة</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {(settings.stats || []).map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[color:var(--theme-surface)]">
        <div className="container-page">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">كيف تعمل المنصة؟</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">رحلة بسيطة بثلاث خطوات</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <FeatureCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="mb-10">
            <p className="text-sm text-blue-600">الخدمات الأكثر طلباً</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">اختر القسم المناسب لك</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Link key={category._id} href={`/services/${category.slug}`} className="card">
                <div className="text-3xl">{category.icon || "🔧"}</div>
                <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{category.description}</p>
              </Link>
            ))}
            {!categories.length && (
              <div className="card">
                <p className="text-sm text-slate-600">أضف الأقسام من لوحة التحكم لتظهر هنا.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[color:var(--theme-surface)]">
        <div className="container-page">
          <div className="mb-8">
            <p className="text-sm text-blue-600">آراء العملاء</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">ثقة المستخدمين في Usta</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} name={item.name} role={item.role} quote={item.quote} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm text-blue-600">الأسئلة الشائعة</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">كل ما تحتاج معرفته قبل البدء</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section-padding bg-[color:var(--theme-surface)]">
        <div className="container-page">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">آخر المقالات</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">نصائح ومقالات مفيدة</h2>
            </div>
            <Link href="/blog" className="btn-outline">عرض الكل</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogData.items.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
            {!blogData.items.length && (
              <div className="card">
                <p className="text-sm text-slate-600">أضف التدوينات من لوحة التحكم لتظهر هنا.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-[color:var(--theme-primary)] to-[color:var(--theme-primary-dark)] p-10 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">جاهز تبدأ تجربتك؟</h2>
                <p className="mt-2 text-sm text-blue-100">حمّل التطبيق أو انضم للحرفيين وابدأ بتنمية عملك.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={settings.ctaPrimaryUrl} className="btn-primary bg-[color:var(--theme-surface)] text-[color:var(--theme-primary-dark)]">
                  {settings.ctaPrimaryText}
                </Link>
                <Link href={settings.ctaSecondaryUrl} className="btn-outline border-white">
                  {settings.ctaSecondaryText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
