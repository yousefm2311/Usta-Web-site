import { Suspense } from "react";
import { getStaticPage } from "@/services/pageService";
import { renderContent } from "@/lib/content";

export const metadata = {
  title: "سياسة الخصوصية"
};

function PageSkeleton() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="skeleton shimmer h-10 w-56 rounded-2xl" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton shimmer h-4 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

async function PrivacyContent({ pagePromise }) {
  const page = await pagePromise;
  const title = page?.title || "سياسة الخصوصية";
  const html = renderContent(page?.content || "سيتم إضافة المحتوى قريباً.", page?.contentType || "markdown");

  return (
    <div>
      <section className="section-padding">
        <div className="container-page">
          <p className="section-kicker">السياسات</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">{title}</h1>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-page">
          <div className="card">
            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PrivacyPage() {
  const pagePromise = getStaticPage("privacy");

  return (
    <Suspense fallback={<PageSkeleton />}>
      <PrivacyContent pagePromise={pagePromise} />
    </Suspense>
  );
}
