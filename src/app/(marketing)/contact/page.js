import ContactForm from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/services/siteSettingsService";

export const metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق Usta لأي استفسار أو دعم فني." 
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contactCards = settings.contactCards || [];

  return (
    <div>
      <section className="section-padding">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="section-kicker">{settings.contactKicker}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">{settings.contactTitle}</h1>
            <p className="mt-4 text-lg text-slate-600">{settings.contactSubtitle}</p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>البريد الإلكتروني: {settings.contactEmail}</p>
              <p>{settings.contactNote}</p>
            </div>

            <div className="mt-8 grid gap-4">
              {contactCards.map((card) => (
                <div key={card.title} className="card card-muted">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                    {card.meta && <span className="chip">{card.meta}</span>}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                </div>
              ))}
              {!contactCards.length && (
                <div className="card card-muted">
                  <p className="text-sm text-slate-600">أضف بطاقات التواصل من لوحة التحكم.</p>
                </div>
              )}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}


