import Link from "next/link";
import { Suspense } from "react";
import { getActiveCategories } from "@/services/categoryService";
import { getSiteSettings } from "@/services/siteSettingsService";

export const metadata = {
  title: "الخدمات",
  description: "اكتشف خدمات Usta المصنفة بعناية واختر القسم المناسب لك." 
};

function ServicesSkeleton() {
  return (
    <section className="section-padding">
      <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton shimmer h-52 rounded-3xl" />
        ))}
      </div>
    </section>
  );
}

async function CategoriesSection({ categoriesPromise, settingsPromise }) {
  const [categories, settings] = await Promise.all([categoriesPromise, settingsPromise]);

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-kicker">{settings.servicesCategoriesKicker}</p>
            <h2 className="section-title">{settings.servicesCategoriesTitle}</h2>
          </div>
          <span className="chip">{settings.servicesChipText}</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category._id} href={`/services/${category.slug}`} className="card group">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  {category.icon || "🛠️"}
                </div>
                <span className="text-sm text-slate-400 transition group-hover:text-blue-600">?</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            </Link>
          ))}
          {!categories.length && (
            <div className="card">
              <p className="text-sm text-slate-600">لا توجد أقسام حالياً.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

async function StepsSection({ settingsPromise }) {
  const settings = await settingsPromise;
  const steps = settings.servicesSteps || [];

  return (
    <section className="section-padding section-surface">
      <div className="container-page">
        <div className="mb-8">
          <p className="section-kicker">{settings.servicesStepsKicker}</p>
          <h2 className="section-title">{settings.servicesStepsTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="card card-muted">
              <div className="feature-icon">{step.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
          {!steps.length && (
            <div className="card">
              <p className="text-sm text-slate-600">أضف خطوات الخدمات من لوحة التحكم.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const categoriesPromise = getActiveCategories();
  const settingsPromise = getSiteSettings();

  return (
    <div>
      <Suspense fallback={null}>
        <HeroSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<section className="section-padding section-surface"><div className="container-page"><div className="skeleton shimmer h-48 rounded-3xl" /></div></section>}>
        <StepsSection settingsPromise={settingsPromise} />
      </Suspense>

      <Suspense fallback={<ServicesSkeleton />}>
        <CategoriesSection categoriesPromise={categoriesPromise} settingsPromise={settingsPromise} />
      </Suspense>
    </div>
  );
}

async function HeroSection({ settingsPromise }) {
  const settings = await settingsPromise;

  return (
    <section className="section-padding">
      <div className="container-page">
        <p className="section-kicker">{settings.servicesPageKicker}</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">{settings.servicesPageTitle}</h1>
        <p className="mt-4 text-lg text-slate-600">{settings.servicesPageSubtitle}</p>
      </div>
    </section>
  );
}


