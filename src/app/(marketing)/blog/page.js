import BlogList from "@/components/BlogList";
import { getSiteSettings } from "@/services/siteSettingsService";

export const metadata = {
  title: "المدونة",
  description: "أحدث المقالات والنصائح من فريق Usta." 
};

export default async function BlogPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <section className="section-padding">
        <div className="container-page">
          <p className="section-kicker">{settings.blogKicker}</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">{settings.blogTitle}</h1>
          <p className="mt-4 text-lg text-slate-600">{settings.blogSubtitle}</p>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-page">
          <BlogList />
        </div>
      </section>
    </div>
  );
}


