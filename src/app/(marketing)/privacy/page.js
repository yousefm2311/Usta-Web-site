import { getStaticPage } from "@/services/pageService";
import { renderContent } from "@/lib/content";

export const metadata = {
  title: "سياسة الخصوصية"
};

export default async function PrivacyPage() {
  const page = await getStaticPage("privacy");
  const title = page?.title || "سياسة الخصوصية";
  const html = renderContent(page?.content || "سيتم إضافة المحتوى قريباً.", page?.contentType || "markdown");

  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="card">
          <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
          <div className="prose prose-slate mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
