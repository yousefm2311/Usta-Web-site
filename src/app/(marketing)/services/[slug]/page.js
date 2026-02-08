import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/services/categoryService";
import { getSiteSettings } from "@/services/siteSettingsService";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);
  if (!category) {
    return { title: "خدمة غير موجودة" };
  }
  return {
    title: category.name,
    description: category.description
  };
}

function ServiceDetailSkeleton() {
  return (
    <div className="section-padding">
      <div className="container-page space-y-6">
        <div className="skeleton shimmer h-28 rounded-3xl" />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton shimmer h-32 rounded-3xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="skeleton shimmer h-48 rounded-3xl" />
          <div className="skeleton shimmer h-48 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

async function ServiceDetailContent({ categoryPromise, settingsPromise }) {
  const [category, settings] = await Promise.all([categoryPromise, settingsPromise]);
  if (!category) {
    notFound();
  }

  const steps = settings.serviceDetailSteps || [];
  const guarantees = settings.serviceDetailGuarantees || [];

  return (
    <div>
      <section className="section-padding">
        <div className="container-page">
          <div className="card">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-3xl">
                {category.icon || "🛠️"}
              </div>
              <div>
                <p className="section-kicker">{settings.serviceDetailKicker}</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">{category.name}</h1>
                <p className="mt-2 text-slate-600">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-page">
          <div className="mb-8">
            <p className="section-kicker">{settings.serviceDetailStepsKicker}</p>
            <h2 className="section-title">{settings.serviceDetailStepsTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={`${step}-${index}`} className="card card-muted">
                <span className="chip">خطوة {index + 1}</span>
                <p className="mt-4 text-sm text-slate-600">{step}</p>
              </div>
            ))}
            {!steps.length && (
              <div className="card">
                <p className="text-sm text-slate-600">أضف خطوات التنفيذ من لوحة التحكم.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-900">{settings.serviceDetailGuaranteesTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {guarantees.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-3">
                  <span className="mt-1 text-blue-600">●</span>
                  <span>{item}</span>
                </li>
              ))}
              {!guarantees.length && (
                <li className="text-sm text-slate-600">أضف ضمانات الخدمة من لوحة التحكم.</li>
              )}
            </ul>
          </div>

          <div className="card card-muted">
            <h3 className="text-lg font-semibold text-slate-900">{settings.serviceDetailCtaTitle}</h3>
            <p className="mt-3 text-sm text-slate-600">{settings.serviceDetailCtaSubtitle}</p>
            <Link href="/contact" className="btn-primary mt-6 w-full justify-center">
              {settings.serviceDetailCtaButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const categoryPromise = getCategoryBySlug(resolvedParams.slug);
  const settingsPromise = getSiteSettings();

  return (
    <Suspense fallback={<ServiceDetailSkeleton />}>
      <ServiceDetailContent categoryPromise={categoryPromise} settingsPromise={settingsPromise} />
    </Suspense>
  );
}


