import { getSiteSettings } from "@/services/siteSettingsService";

export const metadata = {
  title: "من نحن",
  description: "تعرف على قصة Usta ورؤيتنا لبناء منصة احترافية تربط العملاء بالحرفيين." 
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const values = settings.aboutValues || [];
  const promiseStats = settings.aboutPromiseStats || [];
  const chips = settings.aboutChips || [];

  return (
    <div>
      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-kicker">{settings.aboutKicker}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">{settings.aboutTitle}</h1>
            <p className="mt-4 text-lg text-slate-600">{settings.aboutSubtitle}</p>
            {!!chips.length && (
              <div className="mt-6 flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <span key={chip} className="chip">{chip}</span>
                ))}
              </div>
            )}
          </div>

          <div className="card card-muted">
            <h2 className="text-lg font-semibold text-slate-900">{settings.aboutPromiseTitle}</h2>
            <p className="mt-3 text-sm text-slate-600">{settings.aboutPromiseBody}</p>
            <div className="mt-6 grid gap-4">
              {promiseStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] p-4">
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
              {!promiseStats.length && (
                <div className="rounded-2xl border border-blue-100 bg-[color:var(--theme-surface)] p-4">
                  <p className="text-xs text-slate-500">أضف أرقام الوعد من لوحة التحكم.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-900">{settings.aboutMissionTitle}</h2>
            <p className="mt-3 text-sm text-slate-600">{settings.aboutMissionBody}</p>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold text-slate-900">{settings.aboutVisionTitle}</h2>
            <p className="mt-3 text-sm text-slate-600">{settings.aboutVisionBody}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="mb-6">
            <p className="section-kicker">{settings.aboutValuesKicker}</p>
            <h2 className="section-title">{settings.aboutValuesTitle}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {values.map((value) => (
              <span key={value} className="chip">{value}</span>
            ))}
            {!values.length && (
              <span className="text-sm text-slate-600">أضف قيم المنصة من لوحة التحكم.</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


