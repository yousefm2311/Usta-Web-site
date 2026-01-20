import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/services/categoryService";

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

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);
  if (!category) {
    notFound();
  }

  return (
    <div className="section-padding">
      <div className="container-page space-y-10">
        <section className="card">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{category.icon || "🔧"}</div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{category.name}</h1>
              <p className="mt-2 text-slate-600">{category.description}</p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-semibold">كيف تعمل هذه الخدمة؟</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>اختر موعداً مناسباً وحدد تفاصيل الطلب.</li>
            <li>يصلك حرفي متخصص للمعاينة والتنفيذ.</li>
            <li>ادفع بسهولة وقيّم الخدمة بعد الانتهاء.</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-500 p-8 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">جاهز لطلب الخدمة؟</h3>
              <p className="mt-2 text-sm text-blue-100">تواصل معنا لتحديد تفاصيل الطلب.</p>
            </div>
            <Link href="/contact" className="btn-primary bg-[color:var(--theme-surface)] text-[color:var(--theme-primary-dark)]">ابدأ الآن</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
