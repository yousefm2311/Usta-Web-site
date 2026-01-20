export const metadata = {
  title: "من نحن",
  description: "تعرف على قصة Usta ورسالتنا." 
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-page space-y-12">
        <section className="rounded-3xl border border-blue-100 bg-[color:var(--theme-surface)] p-10 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">قصة Usta</h1>
          <p className="mt-4 text-lg text-slate-600">
            تأسست Usta لتكون الجسر الرقمي بين العملاء والحرفيين الموثوقين، مع تجربة سهلة وآمنة للطرفين.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-semibold">رسالتنا</h2>
            <p className="mt-3 text-sm text-slate-600">
              تمكين الحرفيين من الوصول لعملاء أكثر، وتسهيل الحصول على الخدمات بسرعة وجودة.
            </p>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold">رؤيتنا</h2>
            <p className="mt-3 text-sm text-slate-600">
              أن نكون المنصة الأولى في المنطقة لخدمات الحرفيين الذكية.
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold">قيمنا</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            <li className="rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">الثقة والشفافية</li>
            <li className="rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">تجربة عميل استثنائية</li>
            <li className="rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">ابتكار مستمر</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
