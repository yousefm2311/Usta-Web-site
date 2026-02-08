import Link from "next/link";
import { Suspense } from "react";
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
  description: "Usta منصة احترافية تربط العملاء بأفضل الحرفيين بسرعة وموثوقية، مع متابعة وضمان جودة الخدمة."
};

function HeroSkeleton() {
  return (
    <section className="section-padding">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="skeleton shimmer h-6 w-32 rounded-full" />
          <div className="skeleton shimmer h-10 w-4/5 rounded-2xl" />
          <div className="skeleton shimmer h-6 w-3/4 rounded-2xl" />
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="skeleton shimmer h-10 w-32 rounded-full" />
            <div className="skeleton shimmer h-10 w-32 rounded-full" />
          </div>
        </div>
        <div className="skeleton shimmer h-64 rounded-3xl" />
      </div>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <section className="section-padding">
      <div className="container-page grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="skeleton shimmer h-32 rounded-3xl" />
        ))}
      </div>
    </section>
  );
}

function GridSkeleton({ count, columns = "md:grid-cols-3", height = "h-52" }) {
  return (
    <div className={`grid gap-6 ${columns}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`skeleton shimmer ${height} rounded-3xl`} />
      ))}
    </div>
  );
}

function CtaSkeleton() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="skeleton shimmer h-40 rounded-3xl" />
      </div>
    </section>
  );
}

async function HeroSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const stats = settings.stats || [];
  const heroTitle = settings.heroTitle;
  const heroSubtitle = settings.heroSubtitle;
  const heroKicker = settings.heroKicker;
  const heroChips = settings.heroChips || [];
  const ctaPrimaryText = settings.ctaPrimaryText;
  const ctaPrimaryUrl = settings.ctaPrimaryUrl;
  const ctaSecondaryText = settings.ctaSecondaryText;
  const ctaSecondaryUrl = settings.ctaSecondaryUrl;
  const highlightStat = stats[1] || stats[0] || { label: "", value: "" };
  const trustBadges = settings.trustBadges || [];
  const trustText = settings.trustText;

  return (
    <section className="hero-section">
      <div className="hero-orb primary animate-pulse-soft" />
      <div className="hero-orb accent animate-pulse-soft" />
      <div className="hero-grid" />
      <div className="container-page relative z-10 grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          {heroKicker && <span className="pill">{heroKicker}</span>}
          <h1 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={ctaPrimaryUrl} className="btn-primary">
              {ctaPrimaryText}
            </Link>
            <Link href={ctaSecondaryUrl} className="btn-outline">
              {ctaSecondaryText}
            </Link>
          </div>
          {!!heroChips.length && (
            <div className="mt-10 flex flex-wrap gap-3">
              {heroChips.map((chip) => (
                <span key={chip} className="chip">{chip}</span>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <div className="glass-card hero-panel animate-floaty">
            <div className="flex items-center justify-between">
              <span className="chip">{settings.heroCardBadge}</span>
              <span className="text-xs text-slate-500">{settings.heroCardStatus}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{settings.heroCardTitle}</h3>
            <p className="mt-2 text-sm text-slate-600">{settings.heroCardDescription}</p>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] px-4 py-3">
              <p className="text-xs text-slate-500">{highlightStat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{highlightStat.value}</p>
              <p className="mt-1 text-xs text-blue-700">{settings.heroCardTrend}</p>
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
              <span>{settings.heroCardArrivalLabel}</span>
              <span className="text-sm font-semibold text-slate-900">{settings.heroCardArrivalValue}</span>
            </div>
          </div>

          
        </div>
      </div>

      <div className="container-page relative z-10 pb-12">
        <div className="rounded-3xl border border-blue-100 surface-glass p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-600">{trustText}</p>
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span key={badge} className="chip">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function StatsSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const stats = settings.stats || [];

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
          {!stats.length && (
            <div className="card text-center">
              <p className="text-sm text-slate-600">أضف الإحصائيات من لوحة التحكم لتظهر هنا.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

async function CategoriesSection({ categoriesPromise, settingsPromise }) {
  const [categories, settings] = await Promise.all([categoriesPromise, settingsPromise]);

  return (
    <section className="section-padding section-surface">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">{settings.homeServicesKicker}</p>
            <h2 className="section-title">{settings.homeServicesTitle}</h2>
            <p className="mt-3 text-sm text-slate-600">{settings.homeServicesSubtitle}</p>
          </div>
          <Link href="/services" className="btn-outline">
            {settings.homeServicesButtonText}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category._id} href={`/services/${category.slug}`} className="card group">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  {category.icon || "🛠️"}
                </div>
                <span className="text-sm text-slate-400 transition group-hover:text-blue-600">←</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{category.name}</h3>
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
  );
}

async function HighlightsSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const highlights = settings.homeHighlights || [];

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="mb-10">
          <p className="section-kicker">{settings.homeWhyKicker}</p>
          <h2 className="section-title">{settings.homeWhyTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <FeatureCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
          {!highlights.length && (
            <div className="card">
              <p className="text-sm text-slate-600">أضف مميزات المنصة من لوحة التحكم.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

async function HowSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const steps = settings.homeSteps || [];

  return (
    <section className="section-padding section-surface">
      <div className="container-page">
        <div className="mb-10">
          <p className="section-kicker">{settings.homeHowKicker}</p>
          <h2 className="section-title">{settings.homeHowTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <FeatureCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
          {!steps.length && (
            <div className="card">
              <p className="text-sm text-slate-600">أضف خطوات المنصة من لوحة التحكم.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

async function TestimonialsSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const testimonials = settings.homeTestimonials || [];

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="mb-8">
          <p className="section-kicker">{settings.homeTestimonialsKicker}</p>
          <h2 className="section-title">{settings.homeTestimonialsTitle}</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} name={item.name} role={item.role} quote={item.quote} />
          ))}
          {!testimonials.length && (
            <div className="card min-w-[260px]">
              <p className="text-sm text-slate-600">أضف آراء العملاء من لوحة التحكم.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

async function FaqSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const faqs = settings.homeFaqs || [];

  return (
    <section className="section-padding section-surface">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="section-kicker">{settings.homeFaqKicker}</p>
          <h2 className="section-title">{settings.homeFaqTitle}</h2>
          <p className="mt-3 text-sm text-slate-600">{settings.homeFaqSubtitle}</p>
        </div>
        {faqs.length ? (
          <FAQAccordion items={faqs} />
        ) : (
          <div className="card">
            <p className="text-sm text-slate-600">أضف الأسئلة الشائعة من لوحة التحكم.</p>
          </div>
        )}
      </div>
    </section>
  );
}

async function BlogSection({ blogPromise, settingsPromise }) {
  const [blogData, settings] = await Promise.all([blogPromise, settingsPromise]);
  const blogItems = blogData?.items || [];

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-kicker">{settings.homeBlogKicker}</p>
            <h2 className="section-title">{settings.homeBlogTitle}</h2>
          </div>
          <Link href="/blog" className="btn-outline">{settings.homeBlogButtonText}</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogItems.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
          {!blogItems.length && (
            <div className="card">
              <p className="text-sm text-slate-600">أضف التدوينات من لوحة التحكم لتظهر هنا.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

async function CtaSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const ctaPrimaryText = settings.ctaPrimaryText;
  const ctaPrimaryUrl = settings.ctaPrimaryUrl;
  const ctaSecondaryText = settings.ctaSecondaryText;
  const ctaSecondaryUrl = settings.ctaSecondaryUrl;

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-[color:var(--theme-primary)] to-[color:var(--theme-primary-dark)] p-10 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{settings.homeCtaTitle}</h2>
              <p className="mt-2 text-sm text-blue-100">{settings.homeCtaSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={ctaPrimaryUrl} className="btn-primary bg-[color:var(--theme-surface)] ">
                {ctaPrimaryText}
              </Link>
              <Link href={ctaSecondaryUrl} className="btn-outline border-white">
                {ctaSecondaryText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const settingsPromise = getSiteSettings();
  const categoriesPromise = getActiveCategories();
  const blogPromise = getPublishedPosts({ page: 1, pageSize: 3 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Usta",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/favicon.ico`
  };

  return (
    <div>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<section className="section-padding section-surface"><div className="container-page"><GridSkeleton count={6} columns="md:grid-cols-2 lg:grid-cols-3" /></div></section>}>
        <CategoriesSection categoriesPromise={categoriesPromise} settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<section className="section-padding"><div className="container-page"><GridSkeleton count={3} columns="md:grid-cols-3" /></div></section>}>
        <HighlightsSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<section className="section-padding section-surface"><div className="container-page"><GridSkeleton count={3} columns="md:grid-cols-3" /></div></section>}>
        <HowSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<section className="section-padding"><div className="container-page"><GridSkeleton count={3} columns="md:grid-cols-3" height="h-64" /></div></section>}>
        <TestimonialsSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<section className="section-padding section-surface"><div className="container-page"><GridSkeleton count={2} columns="lg:grid-cols-2" height="h-40" /></div></section>}>
        <FaqSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<section className="section-padding"><div className="container-page"><GridSkeleton count={3} columns="md:grid-cols-3" /></div></section>}>
        <BlogSection blogPromise={blogPromise} settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<CtaSkeleton />}>
        <CtaSection settingsPromise={settingsPromise} />
      </Suspense>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
