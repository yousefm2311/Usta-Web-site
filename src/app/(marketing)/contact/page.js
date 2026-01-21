import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق Usta لأي استفسار." 
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">تواصل معنا</h1>
          <p className="mt-3 text-slate-600">
            يسعدنا الرد على استفساراتك. اترك رسالتك وسنعود إليك في أسرع وقت.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>البريد الإلكتروني: usta.contact.site@gmail.com</p>
            {/* <p>الهاتف: +966 555 000 000</p> */}
            <p>تابعنا عبر شبكات التواصل الاجتماعي من أسفل الصفحة.</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
